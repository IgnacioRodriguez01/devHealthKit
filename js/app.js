const on = document.querySelector('#on');
const off = document.querySelector('#off');
const onfav = document.querySelector('#onfav');
const offfav = document.querySelector('#offfav');

const title = document.querySelector('title');
const fav = document.querySelector('head > link:nth-child(4)');
const mask = document.querySelector(".mask");

/* Title/favicon animation */
text = "Check your posture!"
let textArr = [];
let index = 0;
let interval, intervalfav;

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
/* Make sound effect choosable (provide some defaults), 
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

/* Popup */
function createPopup(id) {
    const popup = {"id": id};

    popup.el = document.querySelector(`#${id}`);
    const close = document.querySelector(`#${id} .popup-close`)
    //generate the popup, and toggle it in the mask (remove and generate otg, or leave the html?)
    popup.open = () => {
        popup.el.classList.remove('hidden');
        mask.classList.remove('hidden');
    }
    popup.close = () => {
        popup.el.classList.add('hidden');
        mask.classList.add('hidden');
    }
    close.onclick = () => popup.close();

    return popup;
}

/* Popups intitialize */
const settingsPopup = createPopup('popup-settings');
const qrPopup = createPopup('popup-qr');
const duckPopup = createPopup('popup-duck');
const tasksPopup = createPopup('popup-tasks');

/* QR */
function qrSync() {
    qrPopup.open();
    let queryStr = "?"

    const arr = Object.entries(settings.data)
    console.log(arr)
    arr.forEach((timer, i)=>{
        if(i != 0) queryStr += "&";
        queryStr += `${timer[0]}=${JSON.stringify(timer[1])}`
    })
     
    const qrCont = document.getElementById("qrcode");
    qrCont.textContent = '';

    var qrcode = new QRCode(qrCont, {
        text: "http://192.168.0.18:5500/" + queryStr,
        width: 320,
        height: 320,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.M
    });

}


function readParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    for (key of Object.keys(params)) {
        params[key] = JSON.parse(params[key]);
    }

    if(Object.keys(params).length != 0) {
        alert(JSON.stringify(params));
        localStorage.setItem("settings", JSON.stringify(params))
        window.location.href = '/'
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

/* Settings */

const settings = {
    load: () => {},
    save: () => {},
    read: () => {},
    data: {
        pomo: {f:25,sb:5,lb:15},
        post: {emin:0,esec:5},
        eye: {"20r":true,emin:15,esec:0},
        actbr: {ehr:1,emin:0,esec:0,fmin:5,fsec:0},
        tasks: {today:[],allt:[]} 
    },
}

let timersSettings = settings.data;

/* Timers */
/* evaluate the sync */
let timers = {};


function createTimer(timer) {
    let timerEl = document.querySelector(`#${timer} .counter`);
    let timerCtrl = document.querySelectorAll(`#${timer} .control`);
    obj = {current: "stop", paused: false, repeat: true, "timerEl": timerEl, "timerCtrl": timerCtrl}
    
    obj.start = (timer) => {
        let dateOff, dif;
        
        if(timers[timer].paused && !isNaN(timers[timer].current)) {
            dif = timers[timer].current;
        } else {
            dif = timers[timer].min*60000 + timers[timer].sec*1000 + 1000; //Convert to ms
            if('hr' in timers[timer]) {dif += timers[timer].hr*3600000}
        }
        timers[timer].paused = false;

        dateOff = new Date(Date.now() + dif)
        if(timers[timer].interval) {
            clearInterval(timers[timer].interval)
        }
        timers[timer].interval = setInterval(() => obj.step(dateOff, timer), 500);
        timers[timer].current = "start"; //temporary state for updateControl
        updateControl(timer);
    }
    obj.step = (dateOff, timer) => { //timer arg needed bc of DOM manipulation
        const timeLeft = (dateOff.getTime() - Date.now());
        const sec = Math.floor(timeLeft/1000%60)
        const min = Math.floor(timeLeft/60000%60)
        const hr = Math.floor(timeLeft/3600000%60)

        if(sec < 0 && min < 0 && hr < 0) {
            obj.stop(timer);
            if(obj.repeat) {
                //await callback? or better in stop?
                obj.start(timer);
            }
            return;
        }
        
        const hrtxt = hr;
        const mintxt = min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        const sectxt = sec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        timers[timer].timerEl.textContent = hr > 0 ? `${hrtxt}:${mintxt}:${sectxt}` : `${mintxt}:${sectxt}`;

        timers[timer].current = timeLeft;
    }
    obj.stop = (timer) => {
        clearInterval(timers[timer].interval);
        timers[timer].current = "stop";
        timers[timer].paused = false;
        obj.update(timer);
        updateControl(timer);
    }
    obj.pause = (timer) => {
        clearInterval(timers[timer].interval);
        timers[timer].paused = true;
        updateControl(timer);
    }
    obj.update = (timer) => {
        if(timers[timer].current !== "stop") return;
        
        if(timer == 'pomo') {
            timers[timer].min = timersSettings[timer].f;
            timers[timer].sec = 0;
        }
        if('emin' in timersSettings[timer] && 'esec' in timersSettings[timer]) {
            timers[timer].min = timersSettings[timer].emin;
            timers[timer].sec = timersSettings[timer].esec;
        }
        if('ehr' in timersSettings[timer]) {
            timers[timer].hr = timersSettings[timer].ehr;
        }
        
        const hrtxt = timers[timer].hr;
        const mintxt = timers[timer].min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
        const sectxt = timers[timer].sec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
        timers[timer].timerEl.textContent = "hr" in timers[timer] ? `${hrtxt}:${mintxt}:${sectxt}` : `${mintxt}:${sectxt}`;
    }

    timers[timer] = obj;
    return obj;
}

function setChain(...args) {

}

const timersEl = document.querySelectorAll(".timer"); //dom not related directly with timers
timersEl.forEach((timer)=>{
    createTimer(timer.id);

    timer.addEventListener("click", (e) => {

        if (e.target.classList.contains("start")) {
            console.log(timer.id)
            timers[timer.id].start(timer.id);

        } else if (e.target.classList.contains("stop")) {
            timers[timer.id].stop(timer.id);

        } else if (e.target.classList.contains("pause")) {
            timers[timer.id].pause(timer.id);
        }
    })

    timer.addEventListener("change", () => timers[timer.id].update(timer.id));
    timers[timer.id].update(timer.id);
})

function updateControl(timer, start) {
    const playCtrl = timers[timer].timerCtrl[0].classList;
    const stopCtrl = timers[timer].timerCtrl[1].classList; //be AWARE of the order in DOM

    if (timers[timer].current === "start") {
        playCtrl.remove("start");
        playCtrl.add("pause");
        stopCtrl.remove("hidden");
    }
    if(timers[timer].current === "stop") {
        stopCtrl.add("hidden");
        playCtrl.remove("pause");
        playCtrl.add("start");
    }
    if(timers[timer].current !== "stop" && !timers[timer].paused) {
        playCtrl.remove("start");
        playCtrl.add("pause");
        stopCtrl.remove("hidden")
    }
    if(timers[timer].current !== "stop" && timers[timer].paused) {
        playCtrl.remove("pause");
        playCtrl.add("start");
        stopCtrl.remove("hidden")
    }
}