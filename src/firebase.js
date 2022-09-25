import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyCQro-kkRNm58eDJeJgSea3gTj6Q__QzxM",
    authDomain: "mymanga-list.firebaseapp.com",
    projectId: "mymanga-list",
    storageBucket: "mymanga-list.appspot.com",
    messagingSenderId: "238759107728",
    appId: "1:238759107728:web:f4cf218ec3ae11265e8c15"
});

const db = getDatabase(firebaseConfig);
const auth = getAuth(firebaseConfig);
let id;
window.isLoggedIn = function isLoggedIn(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            id = uid;
            return true;
        } else {
            window.location.href = "login.html";
            return false;
        }
    });
}

window.putData = function putData(data){
    const key = sessionStorage.getItem("key");
    const updates = {};
    let formattedData = data.toString().replaceAll(",","");
    updates['users/'+id+'/data/'+ key + '/data'] = formattedData;
    update(ref(db), updates);
    sessionStorage.setItem("data",formattedData);
}