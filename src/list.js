import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue, push, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyCQro-kkRNm58eDJeJgSea3gTj6Q__QzxM",
    authDomain: "mymanga-list.firebaseapp.com",
    projectId: "mymanga-list",
    storageBucket: "mymanga-list.appspot.com",
    messagingSenderId: "238759107728",
    appId: "1:238759107728:web:f4cf218ec3ae11265e8c15"
});
const auth = getAuth(firebaseConfig);
const db = getDatabase(firebaseConfig);

let profile;
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        profile = uid;
        getData(profile);
    } else {
        window.location.href = "login";
    }
});

let originalChilds = [];
var dataMap = new Map();
var selectedData;
let ItemSelectedID;

let popup = document.getElementById("popup");
let add_button = document.getElementById("add-button"); // + (top right)
let popupform = document.getElementById("popup-form");
let form_add = document.getElementById("add-form"); 

let popupEdit = document.getElementById("popup-edit");
let popupformEdit = document.getElementById("popup-form-edit");
let formEdit = document.getElementById("form-edit");
let deleteButton = document.getElementById("form-delete-edit");

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
    const mangalist = ref(db, 'users/'+user+"/data");
    onValue(mangalist, (snapshot) => {
        const dataOrigin = snapshot;
        if(dataOrigin){
            drawData(snapshot);
        }else{
            console.log("Page not found");
        }
    }, {
        onlyOnce: true
    });
}

//DATA
function saveData(data,key,title){
    sessionStorage.setItem("data",data);
    sessionStorage.setItem("key",key);
    setTimeout(() => { window.location.href = 'mangalist' + '#' + encodeURI(title) }, 150);
}

function drawData(snapshot){
    console.log(snapshot);
    snapshot.forEach((child) => {
    var root = document.getElementById("list");
    
        var object = document.createElement("div");
        object.textContent = child.val().name;
        let data = child.val().data;
        let selected = data.split("1").length - 1;
        let total = data.length;
        let span = document.createElement("span");
        span.innerHTML = selected+"/"+total;
        span.className = "counter";

        dataMap.set(child.key,child);
        object.className = "list-item"
        object.addEventListener('click', function(){
            saveData(dataMap.get(child.key).val().data,child.key,dataMap.get(child.key).val().name);
        });
        object.addEventListener('click',createRipple);
        object.id = child.key;
        span.addEventListener('click',cancelPropagation);
        span.addEventListener('click',function(){ selectedData = dataMap.get(child.key); ItemSelectedID = child.key; fillPopupFields(); });
        span.addEventListener('click',function(){togglePopup(popupEdit);});
        object.appendChild(span);
        originalChilds.push(object);
        root.appendChild(object);
    });
    animate(false);
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

    console.log(dataMap.get(ItemSelectedID));
    collectionName.value = dataMap.get(ItemSelectedID).val().name;
    collectionLength.value =  dataMap.get(ItemSelectedID).val().data.length;
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
    
    
    const mangalist = ref(db, 'users/'+ profile+"/data/");
    let dataL = parseInt(length)+1;
    const postData = {
        name: name,
        data: Array(dataL).join("0")
    };
    onValue(mangalist, (snapshot) => {
        let key = push(ref(db, 'users/'+ profile)).key;
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
    updates[key] = new_data; 
    update(ref,updates);

    const snapshot = {
        child: {
            key: key,
            val(){
                return new_data;
            }
        },
        forEach(action) {
            action(this.child);
        }
    }
    drawData(snapshot);
}

function editManga(newName, newDataLen){
    if(newName == null ) return;
    if(newDataLen == NaN ) return;
    console.log(selectedData);
    let newData = selectedData.val().data;

    if(newDataLen > newData.length){
      newData += Array(newDataLen-newData.length+1).join("0");
    }else{
      newData = newData.substring(0,newDataLen);
    }
    console.log("SLOM;DSL");
    editData(newName,newData);

    let selected = newData.split("1").length - 1;
    let total = newData.length;
    var listItem = document.getElementById(ItemSelectedID);
    var spanChild = listItem.childNodes[1]; 
    listItem.textContent = newName;
    listItem.appendChild(spanChild);
    spanChild.textContent = selected+"/"+total;

}

function deleteManga(){
    editData(null,null);
    document.getElementById(ItemSelectedID).remove();
}

function editData(name, data){
    let updates = {
        name: name,
        data: data
    };
    update(ref(db, 'users/'+ profile + "/data/" + selectedData.key),updates);
    togglePopup(popupEdit);
    const snapshot = {
        child: {
            key: selectedData.key,
            val(){
                return updates;
            }
        },
        forEach(action) {
            action(this.child);
        }
    }
    dataMap.set(selectedData.key,snapshot.child);
}

function cancelPropagation(e){
    e.stopPropagation();
}

function animate(animating){
    let loader = document.getElementById("loader");    
    if(animating){
      loader.style.display = "block";
    }else{
      loader.style.display = "none";
    }
  }