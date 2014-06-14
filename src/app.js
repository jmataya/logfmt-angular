function listAllItems(){
  for (i=0; i<=localStorage.length-1; i++)
  {
    key = localStorage.key(i);
    alert(localStorage.getItem(key));
  }
}

function log(json) {
  var string = "";
  for(var key in json) {
    if (string !== "") {
      string += " ";
    }
    string += key + "=" + json[key];
  }
  var currentDate = new Date();
  var datetime = currentDate.getDate() + "-" +(currentDate.getMonth()+1)
    + "-" + currentDate.getFullYear() + " " + currentDate.getHours() + ":"
    + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  localStorage[datetime] = string;
}
