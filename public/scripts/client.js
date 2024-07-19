/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // create an escape funtion to stop
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };



  // create function to create tweet element
  const createTweetElement = function(tweet) {
    // create tweet HTML structure
    const safeName = escape(tweet.user.name);
    const safeHandle = escape(tweet.user.handle);
    const safeText = escape(tweet.content.text);

    const x = $(`
    <article class="tweet">
        <header>

          <h3><img src="${tweet.user.avatars}" alt="User Avatar">${safeName}</h3>
          <h4 class="handle">${safeHandle}</h4>
        </header>
        <p>${safeText}</p>
        <footer>
          <time>${timeago.format(tweet.created_at)}</time>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return x;
  };

  // create a function to render tweets
  const renderTweets = function(tweets) {
    $("#tweets").empty();// Clear existing tweets(keeps them form doubling)
    const tweetId = $(`#tweets`);

    // Prepend each tweet to container(puts newest at the top)
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      tweetId.prepend(tweetElement);

    }
  };
  // create a function to load tweets form the server
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
      .then(function(data) {
        renderTweets(data);
      })
      .catch(function(error) {
        console.error("Error loading tweets:", error);
      });

  };

  loadTweets();
  // this is the form submission handler
  $(".container form").on("submit", function(event) {
    event.preventDefault();


    // This gets the tweet content, trim takes off whitespace
    const toTextOrNotToText = $(event.currentTarget).find("textarea").val().trim();// check if the text area is MT or has to many characters
    if (!toTextOrNotToText) {
      $(".error-message").text("⚠️ You didn't type anything ⚠️").slideDown();
      return;
    }
    if (toTextOrNotToText.length > 140) {
      $(".error-message").text("⚠️ Your tweet is too long ⚠️").slideDown();
      return;
    }


    // serialize the form data
    const data = $(event.currentTarget).serialize();
    // console.log(data);

    // post it all to the server
    $.ajax({
      method: "POST",
      url: "/tweets",
      data
    })
      .then(function() {
        loadTweets();
        $(".tweet-box").val('');
        $(".counter").text(140);  // Reset character count
      });
  });
});
