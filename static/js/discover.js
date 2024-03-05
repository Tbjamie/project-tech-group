const priceValue = document.querySelector("#priceValue");

for (input of document.querySelectorAll("input[type=range]")) {
  actualizarInput(input);
}

document.addEventListener("input", function (evt) {
  var input = evt.target;
  actualizarInput(input);
});

function actualizarInput(input) {
  var label = input.parentElement.querySelector("label");
  label.innerHTML = input.value;
  var inputMin = input.getAttribute("min");
  var inputMax = input.getAttribute("max");
  var unidad = (inputMax - inputMin) / 100;
  input.style.setProperty("--value", (input.value - inputMin) / unidad);
  if (priceValue.value == 0) {
    document.getElementById("prijsLabel").innerHTML = "Free";
  } else {
    return;
  }
}

$("cross").on("click", function () {
  $("filterMenu").removeClass("selected");
  $(this).addClass("selected");
});
