$(document).ready(function() {
    $("#balanced").on("click", function() {
      // hides main page
      $("#main-page").attr("class", "hide");
  
      var tickerArray = ["fmg.ax", "wes.ax", "anz.ax", "csl.ax", "wow.ax"];
  
      for (var i = 0; i < tickerArray.length; i++) {
        var settings = {
          async: true,
          crossDomain: true,
          url:
            "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail?region=AU&lang=en&symbol=" +
            tickerArray[i],
          method: "GET",
          headers: {
            "Cache-Control": "max-age=2628000",
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "43d993ffedmsh99ef2e1a86cfdf9p100046jsnaa81b3c2dd02"
          }
        };
  
        $.ajax(settings).done(function(response) {
          console.log(response);
          var shareName = response.price.longName;
          var shareSymbol = response.price.symbol;
          var SharePrice = response.price.regularMarketPrice.fmt;
          var beta = response.defaultKeyStatistics.beta.fmt;
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
        });
      }
    });
  });
  
