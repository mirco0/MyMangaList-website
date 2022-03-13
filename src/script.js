window.onload = init;
window.onbeforeunload = function (e) {
  if(isDataChanged()){
    e = e || window.event;
    if (e) {
        e.returnValue = ' ';
    }
    return ' ';
  }
};

let data = [];

function init(){
    initUI();
    loadData();
    generateTable(data.length);
}

function initUI(){
  var title = window.location.hash.substring(1);
  document.getElementById("title").textContent = title.replaceAll("%20"," ");
}

function loadData(){
  const datast = sessionStorage.getItem("data");
  console.log(datast);
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
        object.textContent = i;
        setColor(object,i-1);
        object.addEventListener('click', function(){toggleItem(this,this.textContent-1);});
        var element = document.getElementById("grid");
        element.appendChild(object);
    }
}

function isDataChanged(){
  return sessionStorage.getItem("data") === data;
}