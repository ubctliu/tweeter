/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  $.get("/tweets")
    .done(tweets => {
      for (const tweet of tweets) {
        const date = new Date(tweet.created_at);
        const differenceInDays = Math.round((new Date().getTime() - date.getTime()) / (1000 * 3600 * 24));
        const dayOrDays = differenceInDays > 1 ? "days ago" : "day ago";
        $(".tweets").prepend(`<article class="tweet">
        <header>
        <img src=${tweet.user.avatars}></img>
          <h3>${tweet.user.name}</h3>
          <span class="user-handle">${tweet.user.handle}</span>
        </header>
          <p class="tweet-content">${tweet.content.text}</p>
        <footer> 
          <time>${differenceInDays} ${dayOrDays}</time>
          <div class="icons">
          <span class="fa-solid fa-flag"></span>
          <span class="fa-solid fa-retweet"></span>
          <span class="fa-solid fa-heart"></span>
        </div>
        </footer>
      </article>`);
      }
    });
});