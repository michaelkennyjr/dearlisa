// If it's too early, redirect to the "Too Early" page

window.onload = function() {
  var wedDate = new Date(2019, 5, 8);
  var today = new Date();
  var x = Math.ceil((wedDate - today) / 1000 / 60 / 60 / 24);
  var url = window.location.pathname;
  url = url.replace("/dearlisa/", "");
  url = url.replace(".html", "");
  if (Number(url) < x) {
    window.location.replace("http://michaelkennyjr.github.io/dearlisa/tooearly.html");
  }
}
