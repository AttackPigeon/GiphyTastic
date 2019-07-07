/*
    Jenn Stuart
    HW Assignment 6
    UTexas PTF Coding 2019
*/

// global variables
//  variable to hold array of topics to be made into buttons

var topics= [];


function displayFood() {

        var food = $(this).data("food");
        console.log(food);

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jneAgGgKRlFaRwUzS5on9EOQvS9gik5o&q=" + food +
     "&limit=10&offset=0&rating=R";
        console.log(queryURL)

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

         var results = response.data; 
         console.log (results);

        for (var i = 0; i < results.length; i++) {

          var gifDiv = $("<div>");
          var rating = results[i].rating;
          var defaultAnimatedSrc = results[i].images.fixed_height.url;
          var staticSrc = results[i].images.fixed_height_still.url;
          var p = $("<p>").text("Rating: " + rating);
          var foodImage = $("<img>");
          
          foodImage.attr("src", staticSrc);
          foodImage.addClass("foodGiphy");
        	foodImage.attr("data-state", "still");
        	foodImage.attr("data-still", staticSrc);
        	foodImage.attr("data-animate", defaultAnimatedSrc);
          foodImage.attr("src", results[i].images.fixed_height_still.url);
          // make sure results are added to top of div
          gifDiv.prepend(p);
          gifDiv.prepend(foodImage);
          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
    }

  $("#addFood").on("click", function(event) {
    event.preventDefault();

    var newFood = $("#foodInput").val().trim();

    topics.push(newFood);
    console.log(topics);

    $("#foodInput").val('');
    displayButtons();
  });

  function displayButtons() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $("#food");
      a.attr("id", "food");
      a.attr("data-food", topics[i]);
      a.text(topics[i]);
      $("#buttons").append(a);
    }
  }

  displayButtons();

  //Click event on button with id of "food" executes displayNetflixShow function
  $(document).on( "click", "#food", displayFood);

  //Click event on gifs with class of "foodGiphy" executes pausePlayGifs function
  $(document).on("click", ".foodGiphy", pausePlayGifs);

  //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }