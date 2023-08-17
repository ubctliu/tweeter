/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = (str) => {
  return $('<div>').text(str).html();
};

const createTweetElement = (tweet) => {
  const date = timeago.format(tweet.created_at);
  const $tweet = `<article class="tweet">
        <header>
        <img src=${tweet.user.avatars}></img>
          <h3>${tweet.user.name}</h3>
          <span class="user-handle">${tweet.user.handle}</span>
        </header>
          <p class="tweet-content">${escape(tweet.content.text)}</p>
        <footer> 
          <time>${date}</time>
          <div class="icons">
          <span class="fa-solid fa-flag"></span>
          <span class="fa-solid fa-retweet"></span>
          <span class="fa-solid fa-heart"></span>
        </div>
        </footer>
      </article>`;
  return $tweet;
};

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $(".tweets").prepend($tweet);
  }
};

$(document).ready(() => {
  $('.error-message').css('display', 'none');
  $.get("/tweets")
    .done(tweets => {
      renderTweets(tweets);
    });
  $(".new-tweet").on("submit", (event) => {
    event.preventDefault();
    $('.error-message').slideUp("slow");
    const $formData = $(event.target).serialize();
    const $formDataLength = 140 - $(event.target).find(".counter").text();
    if ($formDataLength <= 140) {
      if ($formDataLength > 0) {
        $.post("/tweets", $formData, (response) => {
          console.log(response);
          $.get("/tweets")
            .done(tweets => {
              renderTweets(tweets);
            });
        });
      } else {
        $(".error-message").slideDown("slow").text("Tweet cannot be empty!");
      }
    } else {
      $(".error-message").slideDown("slow").text("Tweet cannot exceed 140 characters!");
    }
  });
});