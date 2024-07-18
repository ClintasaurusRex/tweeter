/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const createTweetElement = function(tweet) {
    const x = $(`
    <article class="tweet">
        <header>

          <h3><img src="${tweet.user.avatars}" alt="User Avatar">${tweet.user.name}</h3>
          <h4 class="handle">${tweet.user.handle}</h4>
        </header>
        <p>${tweet.content.text}</p>
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


  const renderTweets = function(tweets) {
    $("#tweets").empty();
    const tweetId = $(`#tweets`);

    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      tweetId.prepend(tweetElement);

    }
  };

  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
      .then(function(data) {
        renderTweets(data)
          .catch(console.log("Error"));
      });
  };

  loadTweets();
  $(".container form").on("submit", function(event) {
    console.log("function running");
    event.preventDefault();

    const data = $(event.currentTarget).serialize();
    console.log(data);

    $.ajax({
      method: "POST",
      url: "/tweets",
      data
    })
      .then(function() {
        loadTweets();
      });
  });
});
