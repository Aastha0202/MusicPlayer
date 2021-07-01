console.log("hii music player welcome!!!!!");
// select the audio tag to target to play music
const music = document.querySelector("audio");
// select the audio tag to target to rotate image
const img = document.querySelector('img');
// select the play button for stop and play thr music
const play = document.getElementById("play");
// this variable will keep track that music is playing or not
let isplaying = false;

// select the title id for change its data when music change
const title = document.getElementById("title");
// select the artist id for change its data when music change
const artist = document.getElementById("artist");

// select the prev button for changing the music 
const prev = document.getElementById("prev");
// select the next button for changing the music 
const next = document.getElementById("next");
// aray objects that holds the list of songs
const songs = [
    {
        name: 'song-1',
        imgname: 'image-1',
        title: 'Tarasti hai nigahain',
        artist: 'Parth Desai'
    },
    {
        name: 'song-2',
        imgname: 'image-2',
        title: 'O khuda',
        artist: 'Amaan Malik'
    },
    {
        name: 'song-3',
        imgname: 'image-3',
        title: 'vahlam avone',
        artist: 'Kailash kher'
    },
    {
        name: 'song-4',
        imgname: 'image-4',
        title: 'Jaan ban gaye',
        artist: 'Mithoon'
    },
    {
        name: 'song-5',
        imgname: 'image-5',
        title: 'Kinna sona',
        artist: 'Sunil kamath'
    },
    {
        name: 'song-6',
        imgname: 'image-6',
        title: 'Lut gaye',
        artist: 'Jubin Nutriyal'
    }
]
// we will fetch the duration of song with progress 
let progress=document.getElementById('progress');
let current_time=document.getElementById('current_time');
let duration1=document.getElementById('duration');
// if we click on progress bar we have to fetch it 
const progress_div=document.getElementById('progress_div');
let volume1=document.getElementById('volume1');
let current_volume=document.getElementById('current_volume');
let volume_div=document.getElementById("volume_div");
let volume_icon=document.getElementById('volume_icon');
let isvolume=false;
//  function to play music 
const playmusic = () => {
    // music.play() is a javascript function to play music 
    music.play();
    //we are playing music so we change its value to true
    isplaying = true;
    //convert the play button into pause button we use following property
    play.classList.replace('fa-play', "fa-pause");// replace play icon with pause icon on first time click on play button
    // when music is playing we want our image also rotale so add amine class which we made in css
    // to add that alass anime we use following propert
    img.classList.add("anime");

};
// function to pause music 
const pauseMusic = () => {
    // music.play() is a javascript function to play music 
    music.pause();
    //we stop music so we change its value to false
    isplaying = false;
    //convert the pause button into play button we use following property
    play.classList.replace("fa-pause", "fa-play");// replace pause icon with play icon on first time click on play button
    // when music stop we want our image also stop rotation so remove amine class which we made in css
    // to remove that alass anime we use following propert
    img.classList.remove("anime");
};
play.addEventListener("click", () => {
    // we use ternary oerator for finding variable value is true or not
    // if isplaying is true then pausemusic function will call
    // else playmusic function will call
    isplaying ? pauseMusic() : playmusic();
});
// now we work on prev and next button for that wewant to change the music data also
let songindex=0;// for keep track of song index for next and prev song
//function to change the song values only
const loadsong = (songs) => {
    //change  title and artist value
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    // for changing the music we use src means link for that song
    music.src = `audio/${songs.name}.mp3`;// foldername then name of the audio that is store inside array then format 
    // for changing the image we use src means link for that song
    img.src = `images/${songs.imgname}.jpg`;// foldername then name of the image that is store inside array then format 
};
const nextsong=()=>{
    // this is important formula means we can go 0 to 2 then again 0 so no stall in playing music
    songindex=((songindex+1)%songs.length);
    loadsong(songs[songindex]);
    playmusic();
};
const prevsong=()=>{
    // this is important formula means we can go back  so no stall in playing music
    songindex=(songindex-1+songs.length)%songs.length;
    loadsong(songs[songindex]);
    playmusic();
};
// prev and next button event listner.
next.addEventListener('click',nextsong);
prev.addEventListener('click',prevsong);
//progress bar work in js 
music.addEventListener('timeupdate',(event)=>{ // timeupdate event listner is keep track of the upate time on audio while playing it will call itself in 4 times in  second.
    // console.log(event);
    // use object destructuring
    const {currentTime,duration}=event.srcElement; //means event.srcElement.current will be equals to current time this is the meaning of the object destucturing.
    // console.log(currentTime);
    // console.log(duration);
// we will calculate how many % our song is completed means 0ut of 100% how many % songs we completed for that we use formula
let progress_time=(currentTime/duration)*100;
// we will pass this in width for update that value
progress.style.width=`${progress_time}%`;
// music duration update
let min_duration=Math.floor(duration/60); // our durationn time is in second so we have to convert it in minute
let sec_duration=Math.floor(duration%60); // our durationn time is in second so we have to convert it in minute and now we want remaining second
// we use this for remove NAN error while loading the duretion time
if(sec_duration < 10)
{
    sec_duration=`0${sec_duration}`;
}
if(duration){
    duration1.textContent=`${min_duration}:${sec_duration}`;
}
// music current time update
let min_current=Math.floor(currentTime/60); // our durationn time is in second so we have to convert it in minute
let sec_current=Math.floor(currentTime%60); // our durationn time is in second so we have to convert it in minute and now we want remaining second
// second is less than 10 so we want to print it with 0 so basically following code
if(sec_current < 10)
{
    sec_current=`0${sec_current}`;
}
    current_time.textContent=`${min_current}:${sec_current}`;
});
//progress on click functionality
progress_div.addEventListener('click',(event)=>{
    // we want our total duretion to find seconds where we click.
    const {duration}=music; // which mans const duretion=music.duration.
    // event has one property that is offsetx that indecates where we click in our progressbar it gives value 
    // clientWidth indecated the total width of the element on which we fire the event here total width of the progress bar is indecated by clientwidth that is always constant.
    // by following d=formula we can claculate where we clicked in our progressbar.
    let move_progress=(event.offsetX/event.srcElement.clientWidth)*duration; // this will give where we click that time in second. we have total duration in which wehre we click that specifiy how many second.
    // console.log(move_progress);
    // console.log(duration);
    // now we want to upadte our current time by the value which we get by using formulla
    // the HTMLMediaElement interface's Currenttime property specifies the current playback time in secons changing the value of currenttime to the new time 
music.currentTime=move_progress; // this is our new value from that our song will start and from above function our width and current_time also update because above function will call whenever the currenttime update in our song so we can fetch it 
});
// music ended then automatically play next song 
music.addEventListener('ended',nextsong);// ended is event when song ended so we want to play next song
// volume tag js
volume_div.addEventListener('click',(event)=>{
    let move_progress1=(event.offsetX/event.srcElement.clientWidth);
    music.volume=move_progress1;
    volume1.style.width=`${Math.floor((move_progress1)*100)}%`;
    current_volume.textContent=`${Math.floor((move_progress1)*100)}`;
});
let volumemute=()=>{
    volume_icon.classList.replace('fa-volume-up', "fa-volume-mute");
    music.volume=0;
    isvolume=true;
    volume1.style.width=`${0}%`;
    current_volume.textContent=`${00}`;
};
let volumefull=()=>{
    volume_icon.classList.replace("fa-volume-mute",'fa-volume-up');
    music.volume=1;
    isvolume=false;
    volume1.style.width=`${100}%`;
}
volume_icon.addEventListener('click',()=>{

    isvolume ? volumefull():volumemute();
});
