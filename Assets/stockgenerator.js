var yahoo_path = "https://apidojo-yahoo-finance-v1.p.rapidapi.com.market.getsummary"
var apikey = "&appid=43d993ffedmsh99ef2e1a86cfdf9p100046jsnaa81b3c2dd02";

// grab all details from the yahoofinance app 

function BetaOutput(){
    var queryURL = yahoo_path + apikey; // must work out how to extract all data from yahoo finance
    $.ajax({
        url:queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response);
        // insert variables based on html

        $("#quizresult").empty();
    //if user is a low risk , return 10 companies with beta between 0-0.35
        if (quizresult = lowrisk){
            // find the pathway to access beta between 0-0.35
        }
        else if (quizresult = mediumrisk){
            // find the pathway to access beta between 0.36 - 0.66 
        }
        else (quizresult = highrisk){
            // find the pathway to access beta between 0.67 - 1
        }
    })
}
