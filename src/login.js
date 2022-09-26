import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { errors } from "./errors.js";

document.getElementById("logo").onclick = function(){
    window.location.href = "index.html";
}
document.getElementById("create").onclick = function(){
  window.location.href = "signin.html"
};
document.getElementById("form").onsubmit = function(){ return login(this.elements["email"].value,this.elements["psw"].value);}
const firebaseConfig = initializeApp({
    apiKey: "AIzaSyCQro-kkRNm58eDJeJgSea3gTj6Q__QzxM",
    authDomain: "mymanga-list.firebaseapp.com",
    projectId: "mymanga-list",
    storageBucket: "mymanga-list.appspot.com",
    messagingSenderId: "238759107728",
    appId: "1:238759107728:web:f4cf218ec3ae11265e8c15"
});
const auth = getAuth(firebaseConfig);

function login(email,password){
    animate(true);
    setError("");
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
        window.location.href = "list.html";
        animate(false);
        return true;
      })
      .catch((error) => {
        console.log(error.code);
        setError(errors[error.code]);
        animate(false);
        return false;
      });
      return false;
}

function animate(animating){
  let loader = document.getElementById("loader");
  let button = document.getElementById("button-login");
  
  if(animating){
    loader.style.display = "block";
    button.style.fontSize = 0;
  }else{
    loader.style.display = "none";
    button.style.fontSize = "140%";
  }
}

function setError(text){
  let error = document.getElementById("error"); 
  if(text === ""){
    error.style.display = "none";
  }else{
    error.style.display = "block";
    error.innerHTML = text;
  }
}