$(document).ready(function () {

    displayGifs();
    animateGifs();

    $(document).on("click", ".action", displayGifs);

    $("#add-gif").on("click", function (event) {
        event.preventDefault();

        var gifAction = $("#gif").val().trim();
        if (gifAction == "") {
            return false;
        }

        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.attr("data-gif", gifAction);
        gifButton.text(gifAction);
        console.log(gifButton);

        $("#gif-buttons").append(gifButton);

        $("#gif").val("");
    });


    function displayGifs() {
        var newBtnGif = $(this).attr("data-gif");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + newBtnGif + "&api_key=dc6zaTOxFJmzC&limit=18";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                $("#gif-display-view").empty();
                var results = response.data;
                if (results == "") {
                    alert("There no such results for that GIF");
                }
                for (let i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    $("#gif-display-view").prepend(gifDiv);
                }
            });
    }

    function animateGifs() {
        $(document).on("click", ".image", function () {
            var state = $(this).attr('data-state');
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        });
    }

})


//$(".action:last").remove()