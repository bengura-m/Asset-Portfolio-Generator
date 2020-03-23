var path =
  "https://api.newtonanalytics.com/stock-beta/?index=^AXJO&interval=1mo&observations=60&ticker=";
var ticker = "fmg.ax";

function BetaOutput() {
  var queryURL = path + ticker;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  
  });
}

BetaOutput();