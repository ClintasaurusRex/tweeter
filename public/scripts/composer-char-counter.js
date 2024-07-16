// this waits for DOM to fully load B4 executing
$(document).ready(function() {
  let maxChars = 140;// Set max characters

  // Add event listener for input on the tweet
  $('.tweet-box').on('input', function() {
    //Gets current length of the input
    let inputLength = $(this).val().length;

    // calculate the number of chars left
    const charsLeft = maxChars - inputLength;

    // find the counter element and set it to variable
    const counter = $('.counter');

    // Update the counter with chars reamaining
    counter.text(charsLeft);

    // check if over the limit
    if (charsLeft < 0) {
      // turn it red if yes
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});