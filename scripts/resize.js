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
	console.log("pic whr: " + pic.naturalWidth + ", " + pic.naturalHeight + ", " + picratio);
	
	// Get aspect ratio of frame
	var frame = document.getElementById("frame");
	var frameratio = frame.clientWidth / frame.clientHeight;
	console.log("frame whr: " + frame.clientWidth + ", " + frame.clientHeight + ", " + frameratio);
	    
	// If image is wider than frame, stretch horizontally and push to bottom
	if (picratio > frameratio) {
            // pic.style.width = "100%";
	    // pic.style.height = 100 / picratio + "%";
	    pic.style.width = frame.clientWidth + "px";
	    pic.style.height = frame.clientWidth / picratio + "px";
	    pic.style.left = "0";
            pic.style.bottom = "0";
	// If image is narrower than frame, stretch vertically and keep in middle	
	} else {
	    // pic.style.height = "100%";
            // pic.style.width = 100 * picratio + "%";
	    pic.style.height = frame.clientHeight;
	    pic.style.width = frame.clientHeight * picratio + "px";
	    pic.style.left = (frame.clientWidth - pic.style.width) / 2 + "px";
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
