window.onload = getCode; 

function getCode(){
    let person = prompt("Codice Lista Manga");
    if (person != null) {
      window.location.href = 'list.html' + '#' + person;
      if(local()){
        localStorage.setItem("user",person);
      }else{
        createCookie(person);
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
function createCookie(data){
  document.cookie = "user=${data}; expires= Tue 2038-01-19, 03:13:08 UTC";
}