import _ from 'lodash';
import * as storage from './storage';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onPlay = function (currentTime) {
  storage.default.save('videoplayer-current-time', currentTime.seconds)
  //localStorage.setItem('videoplayer-current-time', currentTime.seconds);
};
player.on('timeupdate', _.throttle(onPlay, 1000));


player
  .setCurrentTime(storage.default.load('videoplayer-current-time'))
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

