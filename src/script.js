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
window.onclick = checkforsave;

let data = [];
let dataOrigin = [];

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
  for(let i = 0; i<datast.length; i++){
    data[i] = ~~datast.charAt(i);
  }
  dataOrigin = [...data];
}

function saveData(){
  let id;
  if(local()){
    id = localStorage.getItem("user");
  }else{
    id = getCookie("user");
  }
    putData(id,data);
  dataOrigin = [...data];
  console.log("tried to save");
}

function toggleItem(object,index){
  data[index] = +!data[index];
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

function checkforsave(){
    document.getElementById("savebutton").style.visibility = isDataChanged()? "visible":"hidden";
}

function isDataChanged(){
  return JSON.stringify(dataOrigin) !== JSON.stringify(data);
}

function local(){
  var test = 'storage';
  try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
  } catch(e) {
      return false;
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
