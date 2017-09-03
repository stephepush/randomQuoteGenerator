var quoteGen = function() {
  $("#quote, #author").empty();
  $.getJSON('https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?', function(data) {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    $("body, button").animate({
      "backgroundColor": "#" + randomColor
    });
    $('#quote').text(data.quoteText);
    $('#author').text("-" + data.quoteAuthor);
    if ($('#author').text() === "-") {
      $('#author').text("-" + "Unattributed");
    }
    var twitterLinkRoot = "https://twitter.com/intent/tweet?text="
      /*this variable is the raw link from the html twitter button. Up next the parameters, in this case, the words of a generated                   quote, will be parsed and added in param form so that the user can tweet their favorite quotes*/
    var tweetQuote = data.quoteText + " " + data.quoteAuthor;
    var tweetQuote = twitterLinkRoot + tweetQuote.split(" ").join('%20');
    var submitQuote = $('.twitter-share-button').attr('href', tweetQuote);
  });
}; //end of "quoteGen" function

$(document).ready(function() {
  quoteGen();
  $('#newQuote').on("click", function() {
    quoteGen();
  });
});