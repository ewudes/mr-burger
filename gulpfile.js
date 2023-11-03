import gulp from "gulp";
import { filePaths } from "./gulp/config/paths.js";

import { copy } from "./gulp/tasks/copy.js";
import { copyRootFiles } from "./gulp/tasks/copyRootFiles.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { javaScript } from "./gulp/tasks/javaScript.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontStyle } from "./gulp/tasks/fonts.js";
import { createSvgSprite } from "./gulp/tasks/createSvgSprite.js";

const isBuild = process.argv.includes("--build");
const handleHTML = html.bind(null, isBuild);
const handleSCSS = scss.bind(null, isBuild);
const handleJS = javaScript.bind(null, !isBuild);
const handleImages = images.bind(null, isBuild);

function watcher() {
  gulp.watch(filePaths.watch.static, copy);
  gulp.watch(filePaths.watch.html, handleHTML);
  gulp.watch(filePaths.watch.scss, handleSCSS);
  gulp.watch(filePaths.watch.js, handleJS);
  gulp.watch(filePaths.watch.images, handleImages);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);

const devTasks = gulp.parallel(
  copy,
  copyRootFiles,
  createSvgSprite,
  handleHTML,
  handleSCSS,
  handleJS,
  handleImages
);

const mainTasks = gulp.series(fonts, devTasks);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

gulp.task("default", dev);

export { dev, build, createSvgSprite };
