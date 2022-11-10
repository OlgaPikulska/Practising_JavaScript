const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onPlay = function (currentTime) {
  //console.log('videoplayer-current-time:', currentTime);
  localStorage.setItem('videoplayer-current-time', JSON.stringify(currentTime));
};
player.on('timeupdate', onPlay);

// const currentSeconds = localStorage.getItem('videoplayer - current - time');
// const parsedCurrentSeconds = JSON.parse(currentSeconds);
// console.log(parsedCurrentSeconds);

player
  .setCurrentTime()
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

console.log(player.setCurrentTime());
