$("#order-form").on("submit", submitForm);

function submitForm(ev) {
  ev.preventDefault();

  var form = $(ev.target),
    data = form.serialize(),
    url = form.attr("action"),
    type = form.attr("method");

  ajaxForm(form)
    .done(function (msg) {
      var mes = msg.mes,
        status = msg.status;

      if (status === "OK") {
        form.append('<p class="success">' + mes + "</p>");
      } else {
        form.append('<p class="error">' + mes + "</p>");
      }
      $(".success").click(function (e) {
        e.preventDefault();
        $(this).remove();
        $("#order-form")[0].reset();
      });
    })
    .fail(function (jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
    });
}

var ajaxForm = function (form) {
  var data = form.serialize(),
    url = form.attr("action");

  return $.ajax({
    type: "POST",
    url: url,
    dataType: "JSON",
    data: data,
  });
};
