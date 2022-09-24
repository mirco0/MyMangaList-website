import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";


document.getElementById("logo").onclick = function(){
    window.location.href = "index.html";
}

document.getElementById("form").onsubmit = function(email,password){ return login(this.elements["email"].value,this.elements["psw"].value);}

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
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
        window.location.href = "list.html";
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        return false;
      });
      return false;
}