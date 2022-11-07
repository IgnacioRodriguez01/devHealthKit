const title = document.querySelector('title');
const fav = document.querySelector('head > link:nth-child(4)');
const on = document.querySelector('#on');
const off = document.querySelector('#off');
const onfav = document.querySelector('#onfav');
const offfav = document.querySelector('#offfav');
text = "Check your posture!"
let textArr = [];
let index = 0;
let interval, intervalfav;

/* Title/favicon animation */
on.addEventListener('click', () => {
    interval = setInterval(() => {
        if (textArr.length == 0) {
            textArr = ("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0" + text).split("");
        }
    
        title.textContent = textArr.join("");
        textArr.shift();
        index++;
        
    }, 200);
})

//Timer in title?

off.addEventListener('click', () => {
    clearInterval(interval);
    title.textContent = "devHealthKit"
})

onfav.addEventListener('click', () => {
    fav.href = "/img/posture.png"
    intervalfav = setInterval(() => {
        fav.href = fav.getAttribute("href") == "/img/rest.png" ? "/img/posture.png" : "/img/rest.png"   
    }, 1000);
})

offfav.addEventListener('click', () => {
    clearInterval(intervalfav);
    fav.href = "/img/cup.png"
})

/* Autoplay */
/* Make sound effect choosable (p´rovide some defaults), 
with custom repeat and volume? */
var x = document.getElementById("myAudio");

function enableAutoplay() { 
    x.autoplay = true;
    x.load();
}
 
function disableAutoplay() { 
    x.autoplay = false;
    x.load();
} 
  
function runAutoplay() { 
    setInterval(() => {
        x.play();
    }, 1000);
} 

//https://www.w3schools.com/jsref/prop_audio_autoplay.asp
//https://usefulangle.com/post/185/javascript-vibrate-device
//https://www.freecodecamp.org/news/how-to-become-a-better-developer-and-live-a-happier-life/
//https://medium.com/geekculture/few-ways-to-generate-qr-code-using-javascript-54b6b5220c4f

/* QR */
function qrSync() {
    let queryStr = "?"

    const arr = Object.entries(timers)
    arr.forEach((timer, i)=>{
        if(i != 0) queryStr += "&";
        queryStr += `m${timer[0]}=${timer[1].min}&s${timer[0]}=${timer[1].sec}`
    })
     
    const qrCont = document.getElementById("qrcode")
    qrCont.textContent = '';

    var qrcode = new QRCode(qrCont, {
        text: "http://192.168.0.18:5500/" + queryStr,
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.M
    });
}


function readParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if(Object.keys(params).length != 0) {
        alert(JSON.stringify(params));
    }
}
readParams();

/* Vibrate */
function vibrate(arr) {
    window.navigator.vibrate(arr);
}

/* Notification */
function notificate() {
    Notification.requestPermission().then(perm => {
        let notification

        if (perm === "granted") {
            notification = new Notification("devHealthKit", {
                body: "Check your posture!",
                icon: "/img/cup.png",
                tag: "posture"
            })
            setTimeout(() => {
                notification.close()
            }, 5000);
        }

    })
}

/* notification.addEventListener("error", e => {
    alert("Activa las notificaciones")
}) */

/* Timers */
/* evaluate the sync */
let timers = {};

function createTimer(timer) {
    let timerEl = document.querySelector(`#${timer} .counter`);
    obj = {current: "stop", paused: false, "timerEl": timerEl}
    
    obj.start = () => {
        let dateOff, dif;
        
        if(timers[timer].paused && !isNaN(timers[timer].current)) {
            dif = timers[timer].current;
        } else {
            dif = timers[timer].min*60000 + timers[timer].sec*1000; //Convert to ms
        }
        timers[timer].paused = false;
        //change to pause icon

        dateOff = new Date(Date.now() + dif)
        if(timers[timer].interval) {
            clearInterval(timers[timer].interval)
        }
        timers[timer].interval = setInterval(() => obj.step(dateOff, timer), 950);
    }
    obj.step = (dateOff, timer) => { //timer arg needed bc of DOM manipulation
        const timeLeft = (dateOff.getTime() - Date.now());
        const sec = Math.floor(timeLeft/1000%60)
        const min = Math.floor(timeLeft/60000%60)

        if(sec <= 0 && min <= 0) {
            obj.stop();
            return;
        }
        
        const mintxt = min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        const sectxt = sec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        timers[timer].timerEl.textContent = `${mintxt}:${sectxt}`;

        timers[timer].current = timeLeft;
    }
    obj.stop = () => {
        clearInterval(timers[timer].interval);
        timers[timer].current = "stop";
        timers[timer].paused = false;
        //change to play icon
        obj.update(timer);
    }
    obj.pause = () => {
        clearInterval(timers[timer].interval);
        timers[timer].paused = true;
        //change to play icon
    }
    obj.update = (timer) => {
        if(timers[timer].current !== "stop") return;

        const inputMin = document.querySelector(`#${timer} .min`);
        const inputSec = document.querySelector(`#${timer} .sec`);
        timers[timer].min = inputMin.valueAsNumber;
        timers[timer].sec = inputSec.valueAsNumber;
        const mintxt = inputMin.valueAsNumber.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
        const sectxt = inputSec.valueAsNumber.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
        timers[timer].timerEl.textContent = `${mintxt}:${sectxt}`;
    }

    timers[timer] = obj;
    return obj;
}

//https://codepen.io/jaycurren/details/WNJZjxL

//play: paused || .current == stop
//pause: !paused || .current != stop
//sync:   

const timersEl = document.querySelectorAll(".timer");
timersEl.forEach((timer)=>{
    createTimer(timer.id);

    timer.addEventListener("click", (e) => {
        switch (e.target.className) {
            case "start":
                console.log(timer.id)
                timers[timer.id].start();
                break;
            case "stop":
                timers[timer.id].stop();
                break;
            case "pause":
                timers[timer.id].pause();
                break;
        
            default:
                break;
        }
        console.log(timers)
    })

    timer.addEventListener("change", () => timers[timer.id].update(timer.id));
    timers[timer.id].update(timer.id);
})

