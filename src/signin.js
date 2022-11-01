import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { errors } from "./errors.js";

document.getElementById("form").onsubmit = function(){ return signin(this.elements["email"].value,this.elements["name"].value,this.elements["psw"].value,this.elements["psw2"].value);}
const firebaseConfig = initializeApp({
    apiKey: "AIzaSyCQro-kkRNm58eDJeJgSea3gTj6Q__QzxM",
    authDomain: "mymanga-list.firebaseapp.com",
    projectId: "mymanga-list",
    storageBucket: "mymanga-list.appspot.com",
    messagingSenderId: "238759107728",
    appId: "1:238759107728:web:f4cf218ec3ae11265e8c15"
});
const auth = getAuth(firebaseConfig);

onAuthStateChanged(auth, (user) => {
  if (user) 
    window.location.href = "list";
});

function signin(email,name,password,confirm_password){
    animate(true);
    setError("");
    if(password!==confirm_password){
        animate(false);
        setError("Passwords don't match");
        return false;
    }
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.uid);
            window.location.href = "list";
            animate(false);
            return true;
        })
        .catch((error) => {
            console.log(error.code);
            setError(errors[error.code]);
            animate(false);
            return false;
        })
        .then((result) => {
            return result.user.updateProfile({
                displayName: name
            })
            .catch((error) => {
                console.log(error.code);
                setError(errors[error.code]);
                animate(false);
                return false;
            });     
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