$("button").on("click", function() {
    var food = $(this).attr("data-food");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jneAgGgKRlFaRwUzS5on9EOQvS9gik5o&q=" + food + 
    "&limit=10&offset=0&rating=PG&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var foodImage = $("<img>");
          foodImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.append(p);
          gifDiv.append(foodImage);

          $("#gifs-appear-here").append(gifDiv);
        }
      });
  });