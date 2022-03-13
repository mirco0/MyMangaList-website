window.onload = init;
let data = [];

function init(){
    loadData("");
    generateTable(data.length);
}

function loadData(datast){
  for(let i = 0; i<datast.length; i++){
    data[i] = ~~datast.charAt(i);
  }
}
function saveData(){}
function toggleItem(object,index){
  data[index] = !data[index];
  setColor(object,index);
}
function setColor(object,index){
  let color;
  data[index] == 1? color = "--selected_dark" : color = "--unselected_dark";
  object.style.background = window.getComputedStyle(document.documentElement).getPropertyValue(color);
}
function generateTable(cols){
    for (let i = 1; i <=cols; i++) {
        var object = document.createElement("div");
        object.className = "grid-item"
        object.innerHTML = i;
        setColor(object,i-1);
        object.addEventListener('click', function(){toggleItem(this,this.innerHTML-1);});
        var element = document.getElementById("grid");
        element.appendChild(object);
    }
}