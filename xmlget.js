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
client.open("GET", "newxml.xml", true);
client.send();

// Function to fill in HTML using XML response
function xmlLoad(xml, cd) {
    var xmlDoc = xml.responseXML;
    var today = xmlDoc.getElementsByTagName("date")[indx].childNodes[0].nodeValue;
    console.log(xmlDoc);
    console.log(today);
    
    // Fill in body text with each paragraph
    var insText = "";
    var todayText = xmlDoc.getElementsByTagName("allt")[indx].childNodes;
    
    var j;
    for (j = 0; j < today.Text.length; j++) {
        console.log(j + ": " + today.Text.childNodes[j].nodeValue);
    }
    
    console.log(todayText);
    var i;
    for (i = 0; i < todayText.length; i++) {
        insText += xmlDoc.getElementsByTagName("allt")[indx].childNodes[i].nodeValue + "<br><br>";
    }
    insText += "Love,<br><br>Michael";
    
    document.getElementById("date").innerHTML = today;
    document.getElementById("count").innerHTML = cd + " days to go";
    document.getElementById("bodytext").innerHTML = insText;
}
