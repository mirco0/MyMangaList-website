import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyCQro-kkRNm58eDJeJgSea3gTj6Q__QzxM",
    authDomain: "mymanga-list.firebaseapp.com",
    projectId: "mymanga-list",
    storageBucket: "mymanga-list.appspot.com",
    messagingSenderId: "238759107728",
    appId: "1:238759107728:web:f4cf218ec3ae11265e8c15"
});

const db = getDatabase(firebaseConfig);

window.putData = function putData(id, data){
    const key = sessionStorage.getItem("key");
    const updates = {};
    let formattedData = data.toString().replaceAll(",","");
    updates['users/'+id+'/data/'+ key + '/data'] = formattedData;
    update(ref(db), updates);
    sessionStorage.setItem("data",formattedData);
}