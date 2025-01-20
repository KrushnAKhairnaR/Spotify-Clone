console.log("Welcome to playlist");

let songIndex = 0;
let audioElement = new Audio('./Songs/Aankhe-Khuli-Ho-Ya-Ho-Band.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItems'));
let masterSongName = Array.from(document.getElementsByClassName('masterPlaySongName'));

let songs = [
    { songName: "Aankhe-Khuli-Ho-Ya-Ho-Band", filePath: "Songs/Aankhe-Khuli-Ho-Ya-Ho-Band.mp3", coverPath: "covers/1.jpg" },
    { songName: "Aaye Ho Meri Zindagi", filePath: "Songs/Aaye-Ho-Meri-Zindagi.mp3", coverPath: "covers/2.jpg" },
    { songName: "Dil Ne Yeh Kaha Hai Dil Se", filePath: "Songs/Dil Ne Yeh Kaha Hai Dil Se.mp3", coverPath: "covers/3.jpg" },
    { songName: "Do Dil Mil Rahe Hai", filePath: "Songs/Do Dil Mil Rahe Hai.mp3", coverPath: "covers/4.jpg" },
    { songName: "Ek Ladki Ko Dekha", filePath: "Songs/Ek Ladki Ko Dekha.mp3", coverPath: "covers/5.jpg" },
    { songName: "Hum Jo Chalne Lage", filePath: "Songs/Hum Jo Chalne Lage.mp3", coverPath: "covers/6.jpg" },
    { songName: "Jaadu Teri Nazar", filePath: "Songs/Jaadu Teri Nazar.mp3", coverPath: "covers/7.jpg" },
    { songName: "Jaane Kyon", filePath: "Songs/Jaane Kyon.mp3", coverPath: "covers/8.jpg" }
];

// Update song items with data from the songs array
songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songTitle')[0].innerText = songs[i].songName;
});

// Play / Pause button functionality
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity = 0;
    }
});

// Update progress bar as the song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Change song playback time based on progress bar value
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Reset all play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Play specific song from the playlist
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
       
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = songs[songIndex].filePath;
            masterSongName[0].innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
       
       
    });
});


document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex === 0) ? songs.length - 1 : songIndex - 1; // Loop to last song if at first song
    audioElement.src = songs[songIndex].filePath;
    masterSongName[0].innerText = songs[songIndex].songName; // Update the displayed song name
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex === songs.length - 1) ? 0 : songIndex + 1; // Loop to first song if at last song
    audioElement.src = songs[songIndex].filePath;
    masterSongName[0].innerText = songs[songIndex].songName; // Update the displayed song name
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
});


// Reset play/pause icons and gif when the song ends
audioElement.addEventListener('ended', () => {
    masterPlay.classList.add('fa-circle-play');
    masterPlay.classList.remove('fa-circle-pause');
    gif.style.opacity = 0;
});
