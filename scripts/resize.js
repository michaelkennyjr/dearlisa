function resize() {
    if (window.innerWidth > 1000) {
	    
	// DESKTOP RESIZING RULES
        document.getElementById("scrollbox").style.left = "calc((100% - 900px) / 2)";
        document.getElementById("scrollbox").style.right = "calc((100% - 900px) / 2)";
	    
    } else {
	    
	// MOBILE RESIZING RULES
	    
	// Get aspect ratio of image
	var pic = document.getElementById("image");
	var picratio = pic.naturalWidth / pic.naturalHeight;
	
	// Get aspect ratio of frame
	var frame = document.getElementById("frame");
	var frameratio = frame.width / frame.height;
	    
	// If image is wider than frame, stretch horizontally and push to bottom
	if (picratio > frameratio) {
            pic.clientWidth = "100%";
	    pic.clientHeight = "";
	    pic.style.left = "0";
            pic.style.bottom = "0";
	// If image is narrower than frame, stretch vertically and keep in middle	
	} else {
	    pic.clientHeight = "100%";
            pic.clientWidth = "";
	    pic.style.left = (frame.width - pic.clientWidth) / 2 + "px";
            pic.style.bottom = "0";
	}
	    
        var imgh = pic.height;
	var winw = window.innerWidth;
	var bot = imgh + winw * 0.05;

	document.getElementById("scrollbox").style.bottom = bot + "px";
	document.getElementById("scrollbox").style.left = "5%";
	document.getElementById("scrollbox").style.right = "5%";
    }
}
