// Make XML request
var client = new XMLHttpRequest();
client.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        xmlLoad(this);
    }
};
client.open("GET", "pages.xml", true);
client.send();

// Get countdown number from URL and convert to XML index
var url = window.location.pathname;
url = url.replace("/dearlisa/", "");
url = url.replace(".html", "");
url = url.replace("test", "");
var daysLeft = 82 - Number(url);

// Function to fill in HTML using XML response
function xmlLoad(xml) {
    var xmlDoc = xml.responseXML;
    var resp = xmlDoc.getElementsByTagName("date")[daysLeft].childNodes[0].nodeValue;
	  document.getElementById("date").innerHTML = resp;
}
