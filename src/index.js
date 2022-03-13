window.onload = getCode; 

function getCode(){
    let person = prompt("Codice Lista Manga");
    if (person != null) {
      window.location.href = 'list.html' + '#' + person;
      sessionStorage.setItem("user",person);
    }
}