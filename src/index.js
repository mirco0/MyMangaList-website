window.onload = onLoad;
document.getElementById("logo").onclick = function(){
    window.location.href = "login.html";
}
function onLoad(){
    var login = document.getElementById("login");
    login.onclick = { };
    if(loggedIn()){
        document.getElementById("profile-picture").style.visibility = "visible";
        login.style.visibility = "hidden";
    }
}

function loggedIn(){
    return !true;
}