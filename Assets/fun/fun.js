// When the user clicks on the button, change content

function changeText() {
  var x = document.getElementById("text");
  if (x.innerHTML === "Why don’t scientists trust atoms?") {
    x.innerHTML = "They make up everything!";
    document.getElementById("click").value = "One More";
  } else if (x.innerHTML === "They make up everything!") {
    x.innerHTML = "Having a bad day? Enjoy this short video";
    x.style.fontSize = "25px";
    x.style.top = "25%";
    x.style.left = "35%";
    document.getElementById("funVideo").style.display = "block";
    document.getElementById("funVideo").style.top = "38%";
    document.getElementById("funVideo").style.left = "38%";
  } else if (x.innerHTML === "Having a bad day? Enjoy this short video") {
    x.innerHTML = "Follow me and take this 10-minute meditation challenge!";
    x.style.fontSize = "25px";
    x.style.top = "25%";
    x.style.left = "33%";
    document.getElementById("funVideo").style.display = "none";
    document.getElementById("mediVideo").style.display = "block";
    document.getElementById("mediVideo").style.top = "38%";
    document.getElementById("mediVideo").style.left = "38%";
  } else {
    x.innerHTML = "Funny Memes";
    x.style.fontSize = "25px";
    x.style.top = "22%";
    x.style.left = "40%";
    document.getElementById("mediVideo").style.display = "none";
    document.getElementById("m1").style.display = "block";
    document.getElementById("m2").style.display = "block";
    document.getElementById("click").style.display = "none";
  }
}
