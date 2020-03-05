var buttonCreating ="";
var topics=["Johhny Depp","Leonardo DiCaprio","Nicolas Cage","Scarlet Johansson","Tom Cruise","Brad Pitt","Lord of The Rings"]
window.onload = function(){

    this.createButton();
    
};
    function createButton(){
   
        $("#buttons").empty();
    for(var i = 0; i< topics.length; i++){
    buttonCreating = topics[i];
    console.log(buttonCreating)
    var buttons = $("<button>");
    buttons.addClass("buttonClick");
    buttons.attr("data-person" , topics[i]);
    buttons.appendTo("#buttons");
    buttons.text(topics[i]);

    }
}


$(document).on("click", "button", displayActors)
    

function displayActors(){
    event.preventDefault();
     var actor = $(this).attr("data-person")
    queryURL ="https://api.giphy.com/v1/gifs/search?q="+actor+"&api_key=3pguTxmURkrAg7NTpH1CHslwheqo21t0";
    $.ajax({
            url: queryURL,
            method: "GET"
        
    }).then(function(response){
        
        var results = response.data
        
        for (var i =0; i < 10;i++){
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        var gifDiv = $("<div>");
        var rating = results[i].rating
        var actorImage = $("<img>");
        // actorImage.addClass("gif");
        actorImage.attr({"src": results[i].images.fixed_height_still.url,
                        "data-still": results[i].images.fixed_height_still.url,
                        "data-animate": results[i].images.fixed_height.url,
                        "data-state": "still",
                        "class": "gif"
            });
      
        var p = $("<p>").text("Rating: " + rating);
        gifDiv.append(p);
        gifDiv.append(actorImage);
        $("#gifs").prepend(gifDiv);
        }
    }
    })
    $("#gifs").empty();
};
 $(document).on("click", "#add-movie",function(event) {
        $("#add-movie").empty()
        
        event.preventDefault();
        // This line grabs the input from the textbox
        var actors = $("#actor-input").val().trim();
        
        // Adding movie from the textbox to our array
        topics.push(actors);
        createButton();
    });

    $(document).on("click", ".gif",function(){
        console.log("click");
        
        var state = $(this).attr("data-state");
        
        if (state === "still"){
            var newSrc = $(this).attr("data-animate")
            $(this).attr("src", newSrc);
            $(this).attr("data-state", "animate");
        } else{
            var newSrc = $(this).attr("data-still")
            $(this).attr("src", newSrc);
            $(this).attr("data-state", "still");
        }
    });

