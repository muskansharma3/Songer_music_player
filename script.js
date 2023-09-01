let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
const img = document.querySelector("img");
const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let progress = document.getElementById("progress");
let song_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");

// List of Songs
const songList = [{
    name: "obsessed",
    title: "obsessed",
    artist: "riar saab"
},
{
    name: "ram-siya-ram",
    title: "ram siya ram",
    artist: "sachet Tandon"
},
{
    name: "aarambh-hai-prachand",
    title: "aarambh",
    artist: "piyush mishra"
},
{
    name: "moonrise",
    title: "moon rise",
    artist: "guru randhawa"
},
{
    name: "sultan",
    title: "bulleya",
    artist: "papon"
},
];

let isplaying = false;

// for play functionality
const playSong = () => {
    isplaying = true;
    song.play();
    ctrlIcon.classList.add("bi-pause-fill");
    ctrlIcon.classList.remove("bi-play-fill");
    img.classList.add("anime");
};

// for pause functionality
const pauseSong = () => {
    isplaying = false;
    song.pause();
    ctrlIcon.classList.add("bi-play-fill");
    ctrlIcon.classList.remove("bi-pause-fill");
    img.classList.remove("anime");
};

// Condition for Play/Pause Button
ctrlIcon.addEventListener("click", () => {
    isplaying ? pauseSong() : playSong();
});

// Changing songs using List

const loadSong = (songList) => {
    songTitle.textContent = songList.title;
    artist.textContent = songList.artist;
    song.src = "static/audio/" + songList.name + ".mp3";
    img.src = "static/images/" + songList.name + ".jpg";
};

songIndex = 0;

// Next Button functionality
const nextSong = () => {
    songIndex = (songIndex + 1) % songList.length;
    loadSong(songList[songIndex]);
    playSong();
};

// Previous Button functionality
const prevSong = () => {
    songIndex = (songIndex - 1 + songList.length) % songList.length;
    loadSong(songList[songIndex]);
    playSong();
};

// time duration meter
song.addEventListener("timeupdate", (event) => {
    const { currentTime, duration } = event.srcElement;

    // song duration
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let total_duration = `${min_duration}:${sec_duration}`;
    if (duration) {
        song_duration.textContent = `${total_duration}`;
    };

    // current duration
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`;
    };
    let total_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_time.textContent = `${total_currentTime}`;
});

// moving progress thumb functionality

if (song.play()) {
    setInterval(() => {
        progress.value = (song.currentTime / song.duration) * 100;
    }, 500);
};

// back and forth sliding thumb progress functionality

progress.onchange = function () {
    song.play();
    song.currentTime = (progress.value / 100) * song.duration;
    ctrlIcon.classList.add("bi-pause-fill");
    ctrlIcon.classList.remove("bi-play-fill");
    img.classList.add("anime");
};

pauseSong();

// next song : Loop
song.addEventListener("ended", nextSong);

// controls : next and previous
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
