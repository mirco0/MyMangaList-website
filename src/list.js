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
var data;
getData(profile);
document.getElementById("add_button").addEventListener("click", createRipple);
function getData(user){
    const db = getDatabase(firebaseConfig);
    const mangalist = ref(db, 'users/'+user);
    onValue(mangalist, (snapshot) => {
        dataOrigin = snapshot.val();
        if(dataOrigin){
            data = dataOrigin;
            drawData(data);
        }else{
            console.log("Page not found");
            //load Page not founds
        }
    }, {
        onlyOnce: true
    });
}

function saveData(index){
    sessionStorage.setItem("data",data[index].Data);
    window.location.href = 'mangalist.html' + '#' + data[index].Name; 
}
function drawData(datas){
    var root = document.getElementById("list");
    for(let i = 1; i<datas.length; i++){
        var object = document.createElement("div");
        object.textContent = datas[i].Name;
        object.className = "list-item"
        object.addEventListener('click', function(){
            var child = this;
            var parent = child.parentNode;
            var index = Array.prototype.indexOf.call(parent.children, child);
            saveData(index+1);
        });
        object.addEventListener('click',createRipple);
        
        root.appendChild(object);
    }
}
