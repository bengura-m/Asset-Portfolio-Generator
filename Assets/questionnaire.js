$(document).ready(function() {
  var totalScore = 0;

  $("#btn-questionnaire").on("click", function() {
    // make main page disappear and display first question
    $("#btn-main").attr("class", "center-align show");
    $("#main-page").attr("class", "hide");
    questionIndex = 0;
    questionDisplay();
  });

  // reloads page when main menu clicked at end - this was the easiest way without manually resetting everything
  $("body").delegate("#restart", "click", function() {
    window.location.reload();
  });

  function questionDisplay() {
    //   adds h tag and inserts question title
    var questionTitle = $("<h5 class='white-text'>").text(questions[questionIndex].question);
    $("#questionnare-page").append(questionTitle);
    //   loops through choices and adds buttons for each one
    for (i = 0; i < questions[questionIndex].choices.length; i++) {
      var btnTag = $("<button>")
        .text(questions[questionIndex].choices[i])
        .attr("class", "deep-purple waves-effect waves-light btn")
        .attr("value", i + 1);
      $("#questionnare-page").append(btnTag);
    }

    // adds score depending on what answer/button is clicked
    $("button").on("click", function() {
      totalScore = parseInt(totalScore) + parseInt($(this).val());
      console.log(parseInt(totalScore));

      // display next question otherwise display result
      questionIndex++;
      if (questionIndex === questions.length) {
        $("#questionnare-page").text("");
        resultsDisplay();
      } else {
        $("#questionnare-page").text("");
        questionDisplay();
      }
    });
  }

  // depending on end totalScore, differnet text and buttons are presented - a bit messy (something to work on in fututre)
  function resultsDisplay() {
    if (totalScore <= 14) {
      $("#questionnare-page")
        .text("You have a Conservative Risk Profile")
        .css("font-size", "25px")
        .append("<br>");
      $("#questionnare-page").append(
        $("<button>")
          .text("Create Conservative Portfolio")
          .attr("class", "deep-purple appetite-btn waves-effect waves-light btn")
          .attr("id", "conservative")
      );
      $("#questionnare-page").append(
        $("<button>")
          .text("Main Menu")
          .attr("class", "deep-purple waves-effect waves-light btn")
          .attr("id", "restart")
      );
    } else if (totalScore <= 22) {
      $("#questionnare-page")
        .text("You have a Balanced Risk Profile")
        .css("font-size", "25px")
        .append("<br>");
      $("#questionnare-page").append(
        $("<button>")
          .text("Create Balanced Portfolio")
          .attr("class", "deep-purple appetite-btn waves-effect waves-light btn")
          .attr("id", "balanced")
      );
      $("#questionnare-page").append(
        $("<button>")
          .text("Main Menu")
          .attr("class", "deep-purple waves-effect waves-light btn")
          .attr("id", "restart")
      );
    } else {
      $("#questionnare-page")
        .text("You have an Aggressive Risk Profile")
        .css("font-size", "25px")
        .append("<br>");
      $("#questionnare-page").append(
        $("<button>")
          .text("Create Aggressive Portfolio")
          .attr("class", "deep-purple appetite-btn waves-effect waves-light btn")
          .attr("id", "aggressive")
      );
      $("#questionnare-page").append(
        $("<button>")
          .text("Main Menu")
          .attr("class", "deep-purple waves-effect waves-light btn")
          .attr("id", "restart")
      );
    }
  }

  // questions - could be put in seperate js file to shorten if required
  var questions = [
    {
      question:
        "Thinking about the risk you have taken with your past investment choices, how would you describe the level of risk?",
      choices: [
        "Not applicable as my past experience is limited",
        "Low",
        "Moderate",
        "High"
      ]
    },
    {
      question:
        "In the context of investing, what best describes your attitude to risk?",
      choices: [
        "It is something to be avoided",
        "It is a source of uncertainty and needs to be limited",
        "It can create the opportunity for improved returns",
        "It is something to be embraced"
      ]
    },

    {
      question:
        "If asked to make your own investment decisions how would you feel?",
      choices: [
        "Not confident at all",
        "Somewhat hesitant",
        "Reasonably confident",
        "Very comfortable"
      ]
    },
    {
      question:
        "If you held a sizable investment that regularly went up and down in value, which would you be likely to do?",
      choices: [
        "Watch its progress daily or weekly as I'm likely to be anxious about investment performance",
        "Watch its progress monthly out of concern over investment performance",
        "Watch its progress regularly, not out of concern, but just for general interest",
        "Only check its progress once or twice a year"
      ]
    },
    {
      question:
        "How would you feel if a large percentage of your investment portfolio was invested in the share market?",
      choices: [
        "Not comfortable",
        "A little hesitant but willing to consider it",
        "Reasonably comfortable",
        "Very comfortable"
      ]
    },
    {
      question:
        "If you owned a large amount of shares and the stock market fell quickly by 20%, what do you believe your natural reaction would be?",
      choices: [
        "To sell all the shares as soon as possible to avoid any further falls",
        "To sell some of the shares to reduce exposure to future falls",
        "To hold the shares and wait for a recovery",
        "To look for ways to buy more shares"
      ]
    },
    {
      question:
        "Investments that go up and down in value in the short-term (i.e. have volatility) are more likely to produce higher returns than investments that remain steady. Are you prepared to experience volatility in your investments in order to increase the chance of higher returns?",
      choices: [
        "No, not at all ",
        "Yes, but only for some of my investment portfolio",
        "Yes, for a significant part of my investment portfolio",
        "Yes, definitely "
      ]
    }
  ];
});
