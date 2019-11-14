var countDownDate = new Date();
countDownDate.setHours(countDownDate.getHours() + 3);
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timeleft").innerHTML =hours + ":" + minutes + ":" + seconds;
    if (distance < 0) {
        clearInterval(x);
    }
}, 1000);

function func1()
{
    var x=document.getElementById("section-A").style.display="block";
    var y=document.getElementById("section-B").style.display="none";
    var z=document.getElementById("section-C").style.display="none";
}
function func2()
{
    var x=document.getElementById("section-A").style.display="none";
    var y=document.getElementById("section-B").style.display="block";
    var z=document.getElementById("section-C").style.display="none";
}
function func3()
{
    var x=document.getElementById("section-A").style.display="none";
    var y=document.getElementById("section-B").style.display="none";
    var z=document.getElementById("section-C").style.display="block";
}

var countDownDate = new Date("Dec 5, 2019 00:00:00").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("timeleft1").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timeleft1").innerHTML = "EXPIRED";
  }
}, 1000);
