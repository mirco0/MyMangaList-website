window.onload = getCode; 

function getCode(){
    let person = prompt("Codice Lista Manga");
    if (person != null) {
      window.location.href = 'list.html' + '#' + person;
      if(local()){
        localStorage.setItem("user",person);
      }else{
        sessionStorage.setItem("user",person);
      }
    }
}

function local(){
  var test = 'storage';
  try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
  } catch(e) {
      return false;
  }
}