window.onload = onLoad;

function onLoad(){
    if(loggedIn()){
        document.getElementById("profile-picture").style.visibility = "visible";
        login.style.visibility = "hidden";
    }
}
function loadLoginPage(){
    window.location.href = "login.html";
}
function loggedIn(){
    return !true;
}