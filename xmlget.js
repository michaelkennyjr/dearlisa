// Get countdown number from URL and convert to XML index
var url = window.location.pathname;
url = url.replace("/dearlisa/", "");
url = url.replace(".html", "");
url = url.replace("test", "");
var daysLeft = 82 - Number(url);

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
    var today = xmlDoc.getElementsByTagName("date")[daysLeft].childNodes[0].nodeValue;
    
    // Fill in body text with each paragraph
    var text = "Hello";
    /* var btext = xmlDoc.getElementsByTagName("text")[daysLeft].childNodes;
    for (i = 0; i < btext.length; i++) {
        text += btext[i].childNodes[0].nodeValue + "<br><br>";
    }
    text += "Love,<br><br>MICHAELANGELO"; */
    
    document.getElementById("date").innerHTML = today;
    document.getElementById("count").innerHTML = cd + " days to go";
    document.getElementById("bodytext").innerHTML = text;
}
