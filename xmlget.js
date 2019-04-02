// Get countdown number from URL and convert to XML index
var url = window.location.pathname;
url = url.replace("/dearlisa/", "");
url = url.replace(".html", "");
url = url.replace("test", "");
var indx = 82 - Number(url);

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
    console.log(tPage);
    
    var i;
    for (i = 0; i < tPage.length; i++) {
        
        // Get name of next node
        var item = tPage.item(i);
        var node = item.nodeName;
        
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
            
        // Change image
        if (node == "image") {
            document.getElementById("image").src = item.innerHTML;
        }
    }
    
    // Get today's full date, store as "today"
    var today = xmlDoc.getElementsByTagName("date")[indx].childNodes[0].nodeValue;
    
    // Fill in body text with each paragraph
    var insText = "";
    var todayText = xmlDoc.getElementsByTagName("allt")[indx].childNodes;
    
    for (i = 0; i < todayText.length; i++) {
        if (todayText.item(i).nodeName != "#text") {
            insText += todayText.item(i).innerHTML + "<br><br>";
        }
    }
    insText += "Love,<br><br>Michael";
    
    document.getElementById("date").innerHTML = today;
    document.getElementById("count").innerHTML = cd + " days to go";
    document.getElementById("bodytext").innerHTML = insText;
}
