// --------------------------click button------------------------------ //

const sticky_btn = document.querySelectorAll(".sticky_btn");

sticky_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
        sticky_btn.forEach((btn) => {
            btn.classList.remove("active_right_nav");
        });

        btn.classList.add("active_right_nav");
    })
})

// ------------------------click button-------------------------------- //

const cross_btn = document.querySelectorAll(".cross_btn");

cross_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
        cross_btn.forEach((btn) => {
            btn.classList.remove("active_left_nav")
        })
        btn.classList.add("active_left_nav");
    })

})

// ------------------------slider buttons------------------------------ //

document.addEventListener('DOMContentLoaded', function () {
    const charts = document.querySelectorAll('.chart');

    charts.forEach((chart) => {
        const leftArrow = chart.querySelector('.left_arrow');
        const rightArrow = chart.querySelector('.right_arrow');
        const mixes = chart.querySelector('.mixes');

        rightArrow.addEventListener("click", () => {
            mixes.scrollBy({ left: 500, behavior: 'smooth' }); z

        });

        leftArrow.addEventListener("click", () => {
            mixes.scrollBy({ left: -500, behavior: 'smooth' });
        });
    });
});

// ------------------------music player------------------------------ //

const audio = document.querySelector("audio");
const music_ts = document.querySelector("#music_ts");
const music_time = document.querySelector("#music_time");
const progress = document.querySelector("#progress")
const progressed = document.querySelector("#progressed");
const prog_dot = document.querySelector("#prog_dot");

// ------------------------progressed--------------------------------- //

audio.addEventListener("timeupdate", () => {
    const duration = audio.duration;
    let currentTime = audio.currentTime;
    let width = ((currentTime / duration) * 100);
    progressed.style.width = `${width}%`;
    prog_dot.style.left = `${width}%`;
});

// ------------------------music time stamps------------------------- //

audio.addEventListener('timeupdate', () => {
    music_ts.innerHTML = time_duration(audio.currentTime)
})

audio.addEventListener('loadedmetadata', () => {
    const duration = audio.duration
    music_time.innerHTML = time_duration(duration)
})

function time_duration(duration) {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration % 60);
    if (sec < 10) {
        return `${min}:0${sec}`;
    }
    else {
        return `${min}:${sec}`;
    }
}

// ------------------------music controls--------------------------- //

const pause_play = document.getElementById("pause_play");
const on_off = document.getElementById("on_off");
pause_play.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        on_off.src = "assets/svg/pause.svg";
    } else {
        audio.pause();
        on_off.src = "assets/svg/PLAYS.svg";
    }
});

// ------------------------music volume--------------------------- //

const vol_mute = document.querySelector("#vol_mute");
const vol_prog = document.querySelector("#vol_prog");
const slider = document.querySelector("#slider");

function volume(value) {
    vol_prog.style.width = `${value * 100}%`;
    slider.style.left = `${value * 100 - 5}%`;
    audio.volume = value;
}

audio.addEventListener("volumechange", () => {
    volume(audio.volume);
    if (audio.volume === 0 || audio.muted) {
        vol_mute.src = "assets/svg/mute.svg";
        vol_prog.style.width = `0%`;
    }
    else {
        vol_mute.src = "assets/svg/vol.svg";
        vol_prog.style.width = `${value * 100}%`;
    }
});

vol_mute.addEventListener("click", () => {

    if (vol_mute.src.includes("mute.svg")) {
        vol_mute.src = "assets/svg/vol.svg";
        audio.volume = lastVolume;
        vol_prog.style.width =`${vol_level*100}%`;
        slider.style.left = `${vol_level*100-5}%`;  
    } else {
        vol_mute.src = "assets/svg/mute.svg";
        lastVolume = audio.volume;
        vol_prog.style.width = `0%`;
        slider.style.left = `0%`;
        audio.volume = 0;
    }
});

// -------------------------dragging------------------------------ //

let isDragging = false;

prog_dot.addEventListener("mousedown", () => {
    isDragging = true;
    document.addEventListener("mousemove", MOUSEMOVE);
    document.addEventListener("mouseup", MOUSEUP);
});

function MOUSEMOVE(e) {
    if (isDragging) {
        let bound_progress = progress.getBoundingClientRect();
        let positionInslider = ((e.clientX - bound_progress.left) / bound_progress.width) * 100;
        if (positionInslider < 0) positionInslider = 0;
        if (positionInslider > 100) positionInslider = 100;
        updatePosition(positionInslider);
    }
}

function MOUSEUP() {
    isDragging = false;
    document.removeEventListener("mousemove", MOUSEMOVE);
    document.removeEventListener("mouseup", MOUSEUP);
}

function updatePosition(value) {
    audio.currentTime = (value / 100) * audio.duration;
    prog_dot.style.left = `${value}%`;
    progressed.style.width = `${value}%`;
}

// -------------------------progress click-------------------------- //

progress.addEventListener("mousedown", (e) => {
    let bound_progress = progress.getBoundingClientRect();
    let positionInslider = ((e.clientX - bound_progress.left) / bound_progress.width) * 100;
    updatePosition(positionInslider);
    isDragging = true;
    document.addEventListener("mousemove", MOUSEMOVE);
    document.addEventListener("mouseup", MOUSEUP);
});


// -------------------------dragging vol-------------------------- //

const volume_box = document.querySelector("#volume");

slider.addEventListener("mousedown", () => {
    isDragging = true;
    document.addEventListener("mousemove", MOUSEMOVEVOL);
    document.addEventListener("mouseup", MOUSEUPVOL);
});

function MOUSEMOVEVOL(e) {
    if (isDragging) {
        let bound_progress = volume_box.getBoundingClientRect();
        let positionInslider = ((e.clientX - bound_progress.left) / bound_progress.width) * 100;
        if (positionInslider < 0) positionInslider = 0;
        if (positionInslider > 100) positionInslider = 100;
        positionInsliderVOL(positionInslider);
    }
}

function MOUSEUPVOL() {
    isDragging = false;
    document.removeEventListener("mousemove", MOUSEMOVEVOL);
    document.removeEventListener("mouseup", MOUSEUPVOL);
}

function positionInsliderVOL(value) {
    audio.volume = value / 100;
    slider.style.left = `${value}%`;
    vol_prog.style.width = `${value}%`;
}

// -------------------------volume click-------------------------- //

volume_box.addEventListener("mousedown", (e) => {
    let bound_progress = volume_box.getBoundingClientRect();
    let positionInslider = ((e.clientX - bound_progress.left) / bound_progress.width) * 100;
    positionInsliderVOL(positionInslider);
    isDragging = true;
    document.addEventListener("mousemove", MOUSEMOVEVOL);
    document.addEventListener("mouseup", MOUSEUPVOL);
});

// -------------------------songs-------------------------- //
const playlist = document.querySelectorAll(".playlist");
const song_name = document.querySelector("#song_title");
const singer = document.querySelector("#song_author");
const song_img = document.querySelector("#music_avatar");

playlist.forEach(function(song) {
    song.addEventListener("click", function() {
        song_cred(song);
    });
});

function song_cred(song) {
    const pl_profile = song.querySelector(".pl_profile img").src;
    const pl_title = song.querySelector(".pl_title").innerHTML;
    const pl_author = song.querySelector(".pl_author").innerHTML;
    const pl_audio_src = song.querySelector(".song_src").innerHTML.trim();

    song_name.innerHTML = pl_title;
    singer.innerHTML = pl_author;
    song_img.src = pl_profile;
    audio.src = pl_audio_src;
    audio.play();
    on_off.src = "assets/svg/pause.svg";
}



/*---------------------------- auto play --------------------------------*/

const song_cred = [];
playlist.forEach((song)=>{
    
})