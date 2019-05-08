    var movies = ["Blade Runner", "Fight Club","Warriors",
        "Death Proof", "Akira", "Pulp Fiction", 
        "Blade", "Dead Presidents", "Belly", "Batman Returns", 
        "Napolean Dynamite","Bring It On", "Mean Girls",
        "Dodgeball", "Anchorman"]

    var APIkey = "V281Wim5Vtp0lc3ZaMHF064k9JjXWGs4";


    function display(){

            var movie = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q="
                + movie + "&api_key=V281Wim5Vtp0lc3ZaMHF064k9JjXWGs4&limit=10";
                console.log(queryURL)
        
            
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                

            var gifs = response.data;

            // Apply response data to images 
            for (var i = 0; i <gifs.length; i++){
                var gifDiv = $("<div>");
                var rating = $("<p>").text("Rating: " + gifs[i].rating);
                gifDiv.append(rating)
                // image display
                var movieImage = $("<img>");
                // animated img
                movieImage.attr("src", gifs[i].images.fixed_height.url);
                // paused img

                
            
                movieImage.attr("data-state", "animate");
                movieImage.attr("data-animate", response.data[i].images.fixed_height.url)
                movieImage.attr("data-still", response.data[i].images.fixed_height_still.url)
                movieImage.addClass("gif");
                // gifDiv.prepend(p);
                gifDiv.prepend(movieImage); 

                $("#gif-container").prepend(gifDiv);

                
            }


            // pull info from database
            $("#buttons-view").text(JSON.stringify(response));
                });
        

    };

            // display data
            function renderButtons() {

                // no repeat buttons
                $("#buttons").empty();
                $("#search").val("");

                // Movie array loop 
                for (var i = 0; i < movies.length; i++){

                    // creating button with data
                    var b = $("<button>");
                    b.addClass("movie");
                    b.attr("data-name", movies[i]);
                    b.text(movies[i]);
                    $("#buttons").append(b);
                    // $("#buttons").append(" "); 
                }
            }

    // Button click
    // function addNewButton () {

        $("#submit").on("click", function(){
            event.preventDefault(); 

            // create button from search box
            var movie = $("#search-input").val();
                if (movie == "") {
                    return false; 
            }

            movies.push(movie);
            console.log(movies)

            renderButtons();
            return false;
        });
    // }

    $(document).on("click", ".movie", display) 
  
        $(document).on("click", ".gif", function()  {
            console.log("data-still")
            var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate")
                    }
                if (state === "animate") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still")
                
                }
        
        });
    

    // displays buttons on page start 
    renderButtons();
    





