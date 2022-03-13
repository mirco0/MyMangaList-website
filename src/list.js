import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyCQro-kkRNm58eDJeJgSea3gTj6Q__QzxM",
    authDomain: "mymanga-list.firebaseapp.com",
    projectId: "mymanga-list",
    storageBucket: "mymanga-list.appspot.com",
    messagingSenderId: "238759107728",
    appId: "1:238759107728:web:f4cf218ec3ae11265e8c15"
});

var profile = window.location.hash.substring(1);
getData(profile);

function getData(user){
    const db = getDatabase(firebaseConfig);
    const mangalist = ref(db, 'users/'+user);
    onValue(mangalist, (snapshot) => {
        const data = snapshot.val();
        if(data){
            drawData(data);
        }else{
            console.log("Page not found");
            //load Page not founds
        }
    });
}
function drawData(data){
    console.log(data);
    var root = document.getElementById("list");
    for(let i = 1; i<data.length; i++){
        var object = document.createElement("div");
        object.innerHTML = data[i].Name + " " + data[i].Data;
        root.appendChild(object);
    }
}