$(document).ready(function() {
  $(".appetite-btn").on("click", function() {
    if (this.id === "conservative") {
      betaRange = "conservative";
    } else if (this.id === "balanced") {
      betaRange = "balanced";
    } else {
      betaRange = "aggressive";
    }

    // hides main page
    $("#main-page").attr("class", "hide");

    var tickerArray = ["fmg.ax", "wes.ax", "anz.ax", "csl.ax", "wow.ax"];
    // let conservativeArray = [];
    // let balancedArray = [];
    // let aggressiveArray = [];

    // loops through our array and makes a number of api requests
    for (let i = 0; i < tickerArray.length; i++) {
      // if array has been stored in local storage we are going to use that - to save server requests (we have a limit) - could setup an || in the if statement (eg if older than 24 hours)
      if (JSON.parse(localStorage.getItem("storedTickerArray0"))) {
        let response = JSON.parse(
          localStorage.getItem("storedTickerArray" + i)
        );
        displayStocks(response);
      } else {
        // yahoo finance api request settings
        var settings = {
          async: true,
          crossDomain: true,
          url:
            "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail?region=AU&lang=en&symbol=" +
            tickerArray[i],
          method: "GET",
          headers: {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "43d993ffedmsh99ef2e1a86cfdf9p100046jsnaa81b3c2dd02"
          }
        };
        $.ajax(settings).done(function(response) {
          displayStocks(response);
        });
      }
      function displayStocks(response) {
        console.log(response);
        localStorage.setItem("storedTickerArray" + i, JSON.stringify(response));
        var beta = response.defaultKeyStatistics.beta.fmt;
        if (beta < 0.7 && betaRange === "conservative") {
          // conservativeArray.push(response)
          // console.log(betaRange);
          printStocks();
        } else if (beta < 1.5 && beta > 0.7 && betaRange === "balanced") {
          // balancedArray.push(response)
          console.log(betaRange);
          printStocks();
        } else if (beta > 1.5 && betaRange === "aggressive") {
          // aggressiveArray.push(response)
          console.log(betaRange);
          printStocks();
        }

        function printStocks() {
          var shareName = response.price.longName;
          var shareSymbol = response.price.symbol;
          var SharePrice = response.price.regularMarketPrice.fmt;
          var sharePreviousClose = response.summaryDetail.previousClose.fmt;
          var SharePriceChange = (
            ((SharePrice - sharePreviousClose) / sharePreviousClose) *
            100
          ).toFixed(2);

          var divTag = $("<div>");
          divTag.attr("class", "col 2 card-panel blue");
          divTag.append(
            shareName,
            "<br>",
            shareSymbol,
            "<br>Last Price: ",
            SharePrice,
            "<br>Daily Change: ",
            SharePriceChange,
            "%<br> Beta: ",
            beta
          );
          $("#stocks").append(divTag);
        }
      }
    }
  });
});
