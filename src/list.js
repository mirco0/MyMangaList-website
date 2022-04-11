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
const db = getDatabase(firebaseConfig);

var profile = window.location.hash.substring(1);
let originalChilds = [];
var data; 
var selectedData;

let popup = document.getElementById("popup");
let add_button = document.getElementById("add-button"); // + (top right)
let popupform = document.getElementById("popup-form");
let form_add = document.getElementById("add-form"); 

let popupEdit = document.getElementById("popup-edit");
let popupformEdit = document.getElementById("popup-form-edit");
let formEdit = document.getElementById("form-edit");
let deleteButton = document.getElementById("form-delete-edit");

getData(profile);

form_add.addEventListener("click",addManga);
add_button.addEventListener("click", createRipple);
add_button.addEventListener("click", function(){togglePopup(popup);});
popup.addEventListener("click",function(){togglePopup(popup);});

popupEdit.addEventListener("click", function(){togglePopup(popupEdit);});
formEdit.addEventListener("click",function(){
    let collectionName = document.getElementById("name-field-edit").value;
    let collectionLength = document.getElementById("collection-number-field-edit").value;
    editManga(collectionName,collectionLength); 
    });
popupform.addEventListener("click",cancelPropagation);
popupformEdit.addEventListener("click",cancelPropagation);
deleteButton.addEventListener("click",deleteManga);

function getData(user){
    
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
        if(datas[i].Data == null){
            originalChilds.push(0);
            continue;
        };
        object.textContent = datas[i].Name;
        let data = datas[i].Data;
        let selected = data.split("1").length - 1;
        let total = data.length;
        
        let span = document.createElement("span");
        span.innerHTML = selected+"/"+total;
        span.className = "counter";

        object.className = "list-item"
        object.addEventListener('click', function(){
            saveData(i);
        });

        object.addEventListener('click',createRipple);
        span.addEventListener('click',cancelPropagation);
        span.addEventListener('click',function(){ selectedData = i; fillPopupFields(); });
        span.addEventListener('click',function(){togglePopup(popupEdit);});
        object.appendChild(span);
        originalChilds.push(object);
        root.appendChild(object);
    }
}

//POPUP
function togglePopup(element){
    let name = "popup-in";
    if( element.className == "popup-in"){
        name = "popup-out";
        clearInput(element.childNodes[1]);
    }
    element.className = name;
    document.body.classList.toggle("non-scrollable");
}
function fillPopupFields(){
    let collectionName = document.getElementById("name-field-edit");
    let collectionLength = document.getElementById("collection-number-field-edit");

    collectionName.value = data[selectedData].Name;
    collectionLength.value = data[selectedData].Data.length;
}
function clearInput(popupform){
    for (let i = 0; i < popupform.childNodes.length; i++) {
        var e = popupform.childNodes[i];
        if(e.className == "input-field")
            e.value = "";
    }
}
function addManga(){
    var name = document.getElementById("name-field").value;
    var length = document.getElementById("collection-number-field").value;
    
    
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
    togglePopup(popup);
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

function editManga(newName, newDataLen){
    let sel = data[selectedData];
    if(newName == null ) return;
    if(newDataLen == NaN ) return;
    let newData = sel.Data;

    if(newDataLen > sel.Data.length){
      newData += Array(newDataLen-newData.length+1).join("0");
    }else{
      newData = newData.substring(0,newDataLen);
    }
    editData(newName,newData);

    let selected = newData.split("1").length - 1;
    let total = newData.length;       
    var listItem = originalChilds[selectedData-1];
    var spanChild = listItem.childNodes[1]; 
    listItem.textContent = newName;
    listItem.appendChild(spanChild);
    spanChild.textContent = selected+"/"+total;

}

function deleteManga(){
    editData("",null);
    var child = originalChilds[selectedData-1];
    child.parentNode.removeChild(child);
}

function editData(Name, Data){
    let updates = {
        Name: Name,
        Data: Data
    };
    update(ref(db, 'users/'+ profile + "/" + (selectedData)),updates);
    togglePopup(popupEdit);
    data[selectedData] = updates;
}

function cancelPropagation(e){
    e.stopPropagation();
}