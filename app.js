var buttonCreating ="";

// var queryURL ="https://api.giphy.com/v1/gifs/trending?"+apikey+
// var apikey = "api_key=3pguTxmURkrAg7NTpH1CHslwheqo21t0";


window.onload = function(){
    
    var topics=["Johhny Depp","Leonardo DiCaprio","Nicolas Cage","Scarlet Johansson","Tom Cruise","Brad Pitt","Lord of The Rings",""]
    
    for(var i = 0; i< topics.length; i++){
    buttonCreating = topics[i];
    console.log(buttonCreating)
    var buttons = $("<button>");
    buttons.addClass("buttonClick");
    buttons.attr("data-person" , topics[i]);
    buttons.appendTo("#buttons");
    buttons.text(topics[i]);

    }
};
$(document).on("click", "button", function (event){
    event.preventDefault();
     var actor = $(this).attr("data-person")
    queryURL ="https://api.giphy.com/v1/gifs/search?q="+actor+"&api_key=3pguTxmURkrAg7NTpH1CHslwheqo21t0";
    $.ajax({
            url: queryURL,
            method: "GET"
        
    }).then(function(response){
        var results = response.data
        
        for (var i =0; i < results.length;i++){
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        var gifDiv = $("<div>");
        var rating = results[i].rating
        var actorImage = $("<img>");
        actorImage.attr("src", results[i].images.fixed_height.url)
        var p = $("<p>").text("Rating: " + rating);
        gifDiv.append(p);
        gifDiv.append(actorImage);
        $("#gifs").prepend(gifDiv);
        }
    }
    })

}); 


