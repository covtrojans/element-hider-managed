function changeImage(fileName, newText) {
	var img = document.getElementById("image");
	var text = document.getElementById("readableText");
	img.src = fileName;
	text.innerText = newText;
	
	document.getElementById("btnYes").style.display = "none";
	document.getElementById("btnNo").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("btnYes").addEventListener("click", function() {
		changeImage("porygon-happy.png", "Yay!");
		document.getElementById("dk-gif").style.display = "initial";
	});
	document.getElementById("btnNo").addEventListener("click", function(){
		changeImage("porygon-sad.png", "Ouch!")
	});
})