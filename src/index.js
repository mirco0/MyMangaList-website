window.onload = onLoad;

let profilePic;
function onLoad(){
    profilePic = document.getElementById("profile-picture");
    isLoggedIn(showProfilePicture);
    profilePic.onclick = logOut;
}
function showProfilePicture(){
    profilePic.style.visibility = "visible";
    login.style.visibility = "hidden";
}