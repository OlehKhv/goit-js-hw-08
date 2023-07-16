import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(saveCurrentPlayTime, 1000));

function saveCurrentPlayTime(e) {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(e.seconds));
    console.log(e.seconds);
}

player.setCurrentTime(
    JSON.parse(localStorage.getItem('videoplayer-current-time')) ?? 0
);

// player.off('timeupdate');
