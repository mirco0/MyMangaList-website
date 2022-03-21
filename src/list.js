import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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

let popup = document.getElementById("popup");
let popupform = document.getElementById("popup-form");
let add_button = document.getElementById("add-button");
let form_add = document.getElementById("add-form");

getData(profile);

form_add.addEventListener("click",addManga);
add_button.addEventListener("click", createRipple);
add_button.addEventListener("click", togglePopup);
popup.addEventListener("click",togglePopup);
document.getElementById("popup-form").addEventListener("click",cancelPropagation);

function getData(user){
    const db = getDatabase(firebaseConfig);
    const mangalist = ref(db, 'users/'+user);
    onValue(mangalist, (snapshot) => {
        const dataOrigin = snapshot.val();
        if(dataOrigin){
            data = dataOrigin;
            drawData(data);
        }else{
            console.log("Page not found");
            
        }
    }, {
        onlyOnce: true
    });
}

//DATA
function saveData(index){
    sessionStorage.setItem("data",data[index].Data);
    sessionStorage.setItem("key",index);
    setTimeout(() => { window.location.href = 'mangalist.html' + '#' + data[index].Name; }, 150);
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

//POPUP
function togglePopup(){
    let name = "popup-in";
    if( popup.className == "popup-in"){
        name = "popup-out";
        clearInput();
    }
    popup.className = name;
    document.body.classList.toggle("non-scrollable");
}

function clearInput(){
    for (let i = 0; i < popupform.childNodes.length; i++) {
        var e = popupform.childNodes[i];
        if(e.className == "input-field")
            e.value = "";
    }
}
function addManga(){
    var name = document.getElementById("name-field").value;
    var length = document.getElementById("collection-number-field").value;
    
    const db = getDatabase(firebaseConfig);
    const mangalist = ref(db, 'users/'+ profile);
    let dataL = parseInt(length)+1;
    const postData = {
        Name: name,
        Data: Array(dataL).join("0")
    };
    
    onValue(mangalist, (snapshot) => {
        let key = snapshot.val().length;
        updateData(mangalist,postData,key);
    }, {
        onlyOnce: true
    });
    togglePopup();
}

function updateData(ref,new_data,key){
    var updates = {};
    
    let updatedData = [];
    updatedData[1] = new_data;
    data.push(new_data);
    updates["/"+key] = new_data; 
    update(ref,updates);
    
    drawData(updatedData);
}

function cancelPropagation(e){
    e.stopPropagation();
}