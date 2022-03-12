window.onload = init;

function init(){
    generateTable(100,2);
}
function generateTable(cols, rows){
    let sqSize = window.innerWidth / 5;
    for (let i = 1; i <=cols; i++) {
        var object = document.createElement("div");
        object.className = "grid-item"
        object.innerHTML = i;
        var element = document.getElementById("grid");
        element.appendChild(object);
        console.log(sqSize);
    }
}
