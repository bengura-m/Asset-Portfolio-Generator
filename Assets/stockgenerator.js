$(document).ready(function() {

  $("body").on("click", ".appetite-btn", function() { 
    $("#questionnare-page").text("");
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
            "x-rapidapi-key":  "43d993ffedmsh99ef2e1a86cfdf9p100046jsnaa81b3c2dd02"
          }
        };
        $.ajax(settings).done(function(response) {
          displayStocks(response);
        });
      }
      function displayStocks(response) {
        console.log(response); // remove this line on pushing to master/production
        localStorage.setItem("storedTickerArray" + i, JSON.stringify(response));
        var beta = response.defaultKeyStatistics.beta.fmt;
        if (beta < 0.7 && betaRange === "conservative") {
          printStocks();
        } else if (beta < 1.5 && beta > 0.7 && betaRange === "balanced") {
          printStocks();
        } else if (beta > 1.5 && betaRange === "aggressive") {
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

          // creates div tag and appends share details
          var divTag = $("<button>");
          divTag.attr("class", "stock col 2 card-panel blue");
          // adds a value attribute for when clicked for news API
          divTag.attr("value", shareName);
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
        } // click listener for when a stock is clicked, then share name is passed to the news

      }      
    }  $(document).on("click", ".stock", function() {
          // when share button is clicked
          $("#resultsSection").empty();
          getNews(this.value);
        });
  });
  // start of news section
  // var shareName = "ASX News"; // default  = "ASX News"

  function getNews(shareName) {
    console.log(shareName); // remove on pushing to master
    var searchTermQualifier = "";
    var newsSourceList = [ //source names are case sensetive and specific to match response - do not change
      "Fool.com.au",
      "Australian Financial Review",
      "Savings.com.au",
      "Sbs.com",
      "News.com.au",
      "9news.com.au",
      "Perthnow.com.au",
      "abc-news-au",
      "7news.com.au",
      "Heraldsun.com.au"
    ];
    // NEWS API
    var queryURL =
      "https://newsapi.org/v2/everything?" + //api returns everthing and not just headlines
      "q=" +
      shareName +
      " " +
      searchTermQualifier +
      "&" +
      "language=en&" + // language is english
      "sortBy=publishedAt&" + // latest news first
      "source=au&" + // Australian news sources only
      "pageSize=30&" + // limit results to 30
      "apiKey=87ce1bad23e546ef86515ee0e5175029";
    var settings = {
      url: queryURL,
      method: "GET"
    };

    $.ajax(settings).done(function(response) {
      var relevantResult = false;
      var count = 0; //keep count of number of relevant results
      $("#resultsSection").append(
        "<h3>Top News Stories</h3>"
      );
      if (response.totalResults > 0) {
        for (var i = 0; i < response.articles.length; i++) {
          if (newsSourceList.includes(response.articles[i].source.name)) { //if result article is in our list of news sources, helps filter relevant results
            console.log(
              newsSourceList.includes(response.articles[i].source.name)
            ); //remove when pushed to master
            relevantResult = true;
            count++; 
            //GET title, source Name & URL
            var title = response.articles[i].title;
            var titleEl = $("<a>").text(title);
            var urlSource = response.articles[i].url;
            var sourceName = response.articles[i].source.name
        
            titleEl.addClass("waves-effect waves-dark modal-trigger"); //.modal-trigger class makes modal visible based on id
            titleEl.attr("href", "#modal" + i);

            //GET descripition
            var description = response.articles[i].description;
            var descriptionEl = $("<p>").text(description);

            // GET news content snippet
            var content = response.articles[i].content;
            content = content.substring(0, 260); // truncate and limit to first 260 chars including spaces
            var contentEl = $("<p>").text(content);

            //GET Author
            var author = response.articles[i].author;
            var authorEl = $("<p>").text(author);

            //GET publish date time
            var publishedAt = response.articles[i].publishedAt;
            publishedAt = new Date(publishedAt).toDateString(); // reformat date time
            var publishedAtEl = $("<p>").text(publishedAt);

            //GET image url
            var urlImage = response.articles[i].urlToImage;
            var imageEl = $("<img>").attr({"src": urlImage, "alt":"News Image Thumbnail"});
            imageEl.css(
              //thumbnail styling
              {
                border: "1px solid #ddd" /* Gray border */,
                "border-radius": "4px" /* Rounded border */,
                padding: "5px" /* Some padding */,
                margin: "5px" /* Some padding */,
                width: "150px" /* Set a small width */
              }
            );
            // CREATE Collection News Item

            var collectionItemEl = $("<a href='#modal" + i +"' class='collection-item avatar modal-trigger left-align'>");
            var collectionItemImage = $("<img>").attr({"src": urlImage, "alt":"News Image Thumbnail"}).addClass("circle hoverable");
            collectionItemEl.css({
              "border-radius": "5px",
              margin: "5px" /* Some padding */,
               });

            collectionItemEl.append(
              collectionItemImage,
              titleEl,
              publishedAtEl,
              "<span>"+sourceName+"</span>",
            );
            // CREATE Modal - News Snippet

            //<!-- Modal Structure -->
            var modalEl = $("<div>").addClass("modal")
            modalEl.attr("id","modal"+i);
            var modalContentDivEl = $("<div>").addClass("modal-content")
            var modalImage = $("<img>").attr({"src":urlImage, "alt" : "News Snippet Image"});
            modalImage.css(
              //modal image styling
              {
                padding: "2px" /* Some padding */,
                width: "70%", /* Cover percentage of modal */
                "box-shadow": "2px 2px 5px grey" /* Small grey shadow */
              }
            );
            var modalHeaderEl = $("<h4>").text(shareName);
            var modalHeaderTitleEl = $("<h5>").text(title);
 
            var modalTextEl = $("<p>").text(content);
            modalContentDivEl.append(modalImage, modalHeaderEl, "<hr>", modalHeaderTitleEl, modalTextEl);

            var modalFooterDivEl = $("<div>").addClass("modal-footer");
            var modalFooterLinkEl = $("<a>").attr({"href": urlSource, "target": "_blank"});
            modalFooterLinkEl.addClass("modal-action modal-close waves-effect waves-green btn-flat blue-text cyan lighten-4").text("Read Full Article");
            modalFooterLinkEl.append($("<i class='material-icons right'>").text("subdirectory_arrow_right"));
            
            modalFooterDivEl.append(modalFooterLinkEl);
          
            modalEl.append(modalContentDivEl, modalFooterDivEl);
      
            // DISPLAY HTML elements to DOM

            $("#resultsSection").append(
              collectionItemEl,
              modalEl, // not visible until modal is triggered
        
            );
            $('.modal').modal(); // open a modal using a trigger

            if (count === 5) {
              // limit relevant results to 5
              break;
            }
          }
        }
        if (!relevantResult) {
          var noNewsMessage = $("<p>").text(
            "...Sorry, no relevant business news on '" +
              shareName +
              "' at the moment."
          );
          $("#resultsSection").append(noNewsMessage);
          return;
        }
      } else {
        var noNewsMessage = $("<p>").text(
          "...Sorry, no latest business news on " +
            shareName +
            " at the moment."
        );
        $("#noNewsMessage").append(noNewsMessage);
      }
    }); // ajax API call close
  } // getNews function close

});
