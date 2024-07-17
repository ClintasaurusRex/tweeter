/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
  const x = $(`
    <article class="tweet">
        <header>

          <h3><img src="${tweet.user.avatars}" alt="User Avatar">${tweet.user.name}</h3>
          <h4 class="handle">${tweet.user.handle}</h4>
        </header>
        <p>${tweet.content.text}</p>
        <footer>
          <time datetime="2024-07-16">${tweet.created_at}</time>
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


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "ElonMusk",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "I wanna NUKE mars!"
    },
    "created_at": 1461116232227
  }

];

const renderTweets = function(tweets) {
  const tweetId = $(`#tweets`);

  for (const tweet of tweets) {
    const tweetElement = createTweetElement(tweet);
    tweetId.prepend(tweetElement);

  }
};

renderTweets(data);

