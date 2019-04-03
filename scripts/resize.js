function resize() {
	  if (window.innerWidth > 1000) {
		    document.getElementById("scrollbox").style.left = "calc((100% - 900px) / 2)";
		    document.getElementById("scrollbox").style.right = "calc((100% - 900px) / 2)";
	  } else {
		    var imgh = document.getElementById("image").height;
		    var winw = window.innerWidth;
		    var bot = imgh + winw * 0.05;

		    document.getElementById("scrollbox").style.bottom = bot + "px";
		    document.getElementById("scrollbox").style.left = "5%";
		    document.getElementById("scrollbox").style.right = "5%";
    }
