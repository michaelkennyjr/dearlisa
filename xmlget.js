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
    var insText = "";
    var todayPage = xmlDoc.getElementsByTagName("text")[daysLeft].childNodes;
    var i;
    for (i = 0; i < todayPage.length; i++) {
        insText += todayPage.getElementsByTagName("para")[i].nodeValue + "<br><br>";
    }
    insText += "Love,<br><br>Michael";
    
    document.getElementById("date").innerHTML = today;
    document.getElementById("count").innerHTML = cd + " days to go";
    document.getElementById("bodytext").innerHTML = insText;
}
