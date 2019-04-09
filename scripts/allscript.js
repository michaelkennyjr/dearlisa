// Get XML data for given countdown number; resize page when done
function xmlGet(mynum, callback) {
    
    console.log("xmlGet for " + mynum);

    // Get countdown number from URL and convert to XML index
    var url = window.location.pathname;
    url = url.replace("/dearlisa/", "");
    url = url.replace(".html", "");
    url = url.replace("test", "");
    var indx = 82 - Number(url);

    // Get days left in countdown
    var wedDate = new Date(2019, 5, 8);
    var today = new Date();
    var dl = Math.ceil((wedDate - today) / 1000 / 60 / 60 / 24);

    // Make XML request
    var client = new XMLHttpRequest();
    client.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xmlLoad(this, mynum);
        }
    };
    client.open("GET", "pages.xml", true);
    client.send();

    // Function to fill in HTML using XML response
    function xmlLoad(xml, cd) {
        var xmlDoc = xml.responseXML;

        // Get nodeList for today's page
        var pages = xmlDoc.getElementsByTagName("page");
        for (p = 0; p < pages.length; p++) {
            if (pages[p].getAttribute("cd") == cd) {
                var tPage = pages[p].childNodes;
                console.log("Found");
                break;
            }
        }

        // var tPage = xmlDoc.getElementsByTagName("page")[indx].childNodes;
        console.log(tPage);

        var i;
        for (i = 0; i < tPage.length; i++) {
            
            // Reset styles to their stylesheet defaults
            // document.body.style.backgroundColor = "";
            // document.body.style.color = "";
            // document.getElementById("scrollbox").style.backgroundColor = "";

            // Get name of next node
            var item = tPage.item(i);
            var node = item.nodeName;

            // Change date
            if (node == "date") {
                document.getElementById("date").innerHTML = item.innerHTML;
                document.getElementById("count").innerHTML = cd + " days to go";
            }

            // Change background color
            if (node == "bg") {
                document.body.style.backgroundColor = item.innerHTML;
            }

            // Change text color
            if (node == "tc") {
                document.body.style.color = item.innerHTML;
            }

            // Change box color
            if (node == "boxc") {
                document.getElementById("scrollbox").style.backgroundColor = item.innerHTML;
            }

            // Pull text to add to page
            if (node == "allt") {
                var todayText = item.childNodes;
                var insText = "";
                var ps = "";
                for (j = 0; j < todayText.length; j++) {

                    // Add paragraph
                    if (todayText.item(j).nodeName == "para") {
                        insText += todayText.item(j).innerHTML + "<br><br>";
                    }

                    // Temporarily store P.S., if there is one
                    if (todayText.item(j).nodeName == "ps") {
                        ps = todayText.item(j).innerHTML;
                    }
                }

                // Add signature
                insText += "Love,<br><br>Michael";

                // If there's a P.S., add it
                if (ps != "")
                {
                    insText += "<br><br>" + ps;
                }

                // Replace body text with entirety of insText
                document.getElementById("bodytext").innerHTML = insText;
            }

            // Change layout
            var sty = "";
            if (node == "layout") {
                sty = item.innerHTML;
                document.getElementById("css").href = "styles/" + sty + ".css";
            }

            // Change image
            if (node == "image") {
                if (sty == "fullpho") {
                    document.body.backgroundImage = "url(" + item.innerHTML + ")";
                } else {
                    document.getElementById("image").src = item.innerHTML;
                }
            }
            
            // Resize
	    callback();
        }
    }
}

// Change day based on button click
function newDay(cd, op, callback) {
  
  console.log("New day");

  // Change countdown date depending on which button was pressed
  switch(op) {
    // Go to first day (2/15, 113 to go)
    case 0:
      cd = 113;
      break;
      
    // Go to previous day
    case 1:
      cd++;
      break;
      
    // Go to next day
    case 2:
      cd--;
      break;
      
    // Go to today
    default:
      var wedDate = new Date(2019, 5, 8);
      var today = new Date();
      cd = Math.ceil((wedDate - today) / 1000 / 60 / 60 / 24);
  }
  
  // Run xmlGet to reset page to new day
  callback(cd, resize);
  
  // Return the new countdown number
  return cd;
}

// Resize page
function resize() {
	
  if (window.innerWidth > 1000) {
	    
	// DESKTOP RESIZING RULES
        document.getElementById("scrollbox").style.left = "calc((100% - 900px) / 2)";
        document.getElementById("scrollbox").style.right = "calc((100% - 900px) / 2)";
	    
    } else {
	    
	// MOBILE RESIZING RULES
	    
	// Get aspect ratio of image
	var pic = document.getElementById("image");
	    console.log(pic.src);
	var picratio = pic.naturalWidth / pic.naturalHeight;
	    
	console.log("pic whr: " + pic.naturalWidth + ", " + pic.naturalHeight + ", " + picratio);
	
	// Get aspect ratio of frame
	var frame = document.getElementById("frame");
	var frameratio = frame.clientWidth / frame.clientHeight;
	    
	console.log("frame whr: " + frame.clientWidth + ", " + frame.clientHeight + ", " + frameratio);
	    
	// If image is wider than frame, stretch horizontally and push to bottom
	if (picratio > frameratio) {
	    pic.style.width = frame.clientWidth + "px";
	    pic.style.height = frame.clientWidth / picratio + "px";
	    pic.style.left = "0";
            pic.style.bottom = "0";
	// If image is narrower than frame, stretch vertically and keep in middle	
	} else {
	    pic.style.height = frame.clientHeight + "px";
	    pic.style.width = frame.clientHeight * picratio + "px";
	    pic.style.left = (frame.clientWidth - pic.clientWidth) / 2 + "px";
            pic.style.bottom = "0";
	}
	    
        var imgh = pic.clientHeight;
	var winw = window.innerWidth;

	document.getElementById("scrollbox").style.bottom = (imgh + winw * 0.05) + "px";
	document.getElementById("scrollbox").style.left = "5%";
	document.getElementById("scrollbox").style.right = "5%";
    }
}
