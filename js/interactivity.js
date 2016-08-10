jQuery("#credits").on("click", function() {
    var message = "Game created by Manuel!";
    jQuery("#credits").append(
       "<p>" + message + "</p>"
        );

    jQuery("#that").empty();

});

jQuery("#scoresbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<ul>" +
            "<li>" + "Me" + "</li>" +
            "<li>" + "Also me" + "</li>" +
            "<li>" + "Me again" + "</li>" +
        "</ul>"
    );
});

jQuery("#creditsbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<div>" + "Game created by Manuel!" + "</div>"
    );
});

jQuery("#helpbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<ul>"+ "<li>" + "Press SPACE to flap your wings" + "</li>"+ "<li>" + "Avoid the incoming pipes" + "</li>"+ "</ul>"
    );
});

function registerScore(score){

  console.log("Registering score...");
  var playerName = prompt("What's your name?");
  var scoreEntry = "<p>" + playerName + ":" + score.toString() + "</p>";
  jQuery("#scoreBoard").append(scoreEntry);
  game.paused = true;
  game.state.restart();
}
