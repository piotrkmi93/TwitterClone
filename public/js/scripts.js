window.addEventListener('load', () => {
  var path = window.location.pathname,
      items = document.querySelectorAll('ul.nav.navbar-nav li a');
  for(let it of items)
    if(0 === path.indexOf(it.getAttribute("href")))
      it.parentElement.className += " active";
});

function loadBase64(input_id, file_id)
{
    let input = document.querySelector("input#"+input_id);
    let file = document.querySelector("input#"+file_id).files[0];
    let reader = new FileReader();

    reader.addEventListener("load", () => input.value = reader.result);

    if(file) reader.readAsDataURL(file);
}