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
        xmlLoad(this, Number(url));
    }
};
client.open("GET", "pages.xml", true);
client.send();

// Function to fill in HTML using XML response
function xmlLoad(xml, cd) {
    var xmlDoc = xml.responseXML;
    
    // Get nodeList for today's page
    var tPage = xmlDoc.getElementsByTagName("page")[indx].childNodes;
    console.log(xmlDoc);
    console.log(tPage);
    
    var i;
    for (i = 0; i < tPage.length; i++) {
        
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
        if (node == "layout") {
            document.getElementById("css").href = "styles/" + item.innerHTML + ".css";
        }
        
        // Change image
        if (node == "image") {
            document.getElementById("image").src = item.innerHTML;
        }
    }
}
