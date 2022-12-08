const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = [
    {
        'title': 'Imminent Collapse',
        'file': 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/u9csURaThLY5UqtPNABXzH1QsX0l5qYd0BylNnIb.mp3', 
        'cover': 'https://freemusicarchive.org/image/?file=image%2FLaTeyifAY1hbQr1YG9c5dHB9NVNu0hBf1KzDiq3G.jpg&width=290&height=290&type=album'
    },
    {
        'title': 'Work It Out',
        'file': 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/As582UwY0Cg20YFuJlgu0yiysl01yHjo7HKJhAwo.mp3', 
        'cover': 'https://freemusicarchive.org/image/?file=track_image%2FptREnLNkQgrUVUO1pryEpQfiTci05ZvEi7ysoNYJ.png&width=290&height=290&type=track'
    },
    {
        'title': 'Funk Saviour',
        'file': 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/jm0MJdbSRyLKrUQK41uFWfMgcmPw349U4Z1zAVVr.mp3', 
        'cover': 'https://freemusicarchive.org/image/?file=album_image%2F9TMiZHdrPELdHmkNXtvUxaNadv1JGeN2SF5f8OoF.jpg&width=290&height=290&type=album'
    }
]

// Keep track of song
let songIndex = 0;

// Initally load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song){
    title.innerText = song.title;
    audio.src = song.file;
    cover.src = song.cover
}
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play()
}
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause()
}
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar
function updateProgress(e){
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set Progress bar
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width)  * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play'); 
    if (isPlaying){
        pauseSong();
    }else{
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong)

nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)