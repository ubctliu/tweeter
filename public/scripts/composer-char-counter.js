const MAX_TWEET_LENGTH = 140;

$(document).ready(() => {
  $("#tweet-text").on('keydown' , (event) => {
    const textareaText = $(event.target).val();
    let currentCharCount = textareaText.length;
    let counter = Number($(".counter").val());
    counter = MAX_TWEET_LENGTH - currentCharCount;
    if (counter < 0) {
      $(".counter").css('color', 'red');
    } else {
      $(".counter").css('color', '');
    }
    $(".counter").val(counter);
  });
});