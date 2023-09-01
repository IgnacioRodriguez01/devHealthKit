import React from "react";

const Popup = () => {
  return (
    <div class="mask hidden fixed w-screen h-screen flex items-center justify-center">
      <div
        id="popup-settings"
        class="hidden popup rounded-3xl p-7 flex flex-col items-center justify-between"
      >
        <h2 class="text-5xl font-bold mr-auto">Settings</h2>
        <div class="popup-close">
          <img src="/img/x.svg" />
        </div>
        <div class="popup-body">
          <div class="col1">
            <h3 class="text-3xl font-bold">General</h3>
            <label class="c-contain">
              <span>Sounds</span>
              <input type="checkbox" />
              <div class="b-input"></div>
            </label>
            <label class="c-contain">
              <span>Notifications</span>
              <input type="checkbox" />
              <div class="b-input"></div>
            </label>
            <label class="c-contain">
              <span>Icon animations</span>
              <input type="checkbox" />
              <div class="b-input"></div>
            </label>
            <label class="c-contain">
              <span>Title animations</span>
              <input type="checkbox" />
              <div class="b-input"></div>
            </label>
            <label class="c-contain">
              <span>Vibrations (Mobile only)</span>
              <input type="checkbox" />
              <div class="b-input"></div>
            </label>
            <h3 class="text-3xl font-bold">Sound</h3>
            <div class="sound-grid">
              <p>Alarm sound</p>
              <input id="sett-alarm" value="Bell" type="text" />
              <p>Repeat</p>
              <input id="sett-repeat" value="1" type="text" />
              <p>Volume</p>
              <input id="sett-vol" value="100" type="text" />
            </div>
          </div>
          <div class="col2">
            <h3 class="text-2xl font-bold">Individual timer settings</h3>
            <div class="mt-5" id="sett-pomo">
              <h4 class="text-xl font-bold">Pomodoro</h4>
              <label class="c-contain">
                <span>Auto start</span>
                <input type="checkbox" />
                <div class="b-input"></div>
              </label>
            </div>
            <div class="mt-5" id="sett-eye">
              <h4 class="text-xl font-bold">Eye relax</h4>
              <div class="time-grid">
                <p>Every</p>
                <input class="sett-min" value="15" type="text" />
                <p>:</p>
                <input class="sett-sec" value="00" type="text" />
              </div>
              <label class="c-contain">
                <span>20-20-20 rule</span>
                <input type="checkbox" />
                <div class="b-input"></div>
              </label>
            </div>
            <div class="mt-5" id="sett-post">
              <h4 class="text-xl font-bold">Posture check</h4>
              <div class="time-grid">
                <p>Every</p>
                <input class="sett-min" value="15" type="text" />
                <p>:</p>
                <input class="sett-sec" value="00" type="text" />
              </div>
            </div>
            <div class="mt-5" id="sett-actbr">
              <h4 class="text-xl font-bold">Active breaks</h4>
              <div class="time-grid">
                <p>Every</p>
                <input class="sett-hour" value="1" type="text" />
                <p>:</p>
                <input class="sett-min" value="15" type="text" />
                <p>:</p>
                <input class="sett-sec" value="00" type="text" />
              </div>
              <div class="time-grid">
                <p>For</p>
                <input class="sett-min" value="15" type="text" />
                <p>:</p>
                <input class="sett-sec" value="00" type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="popup-qr"
        class="hidden popup rounded-3xl p-7 flex flex-col items-center justify-between"
      >
        <h2 class="text-4xl font-bold">Sync with your mobile</h2>
        <div class="popup-close">
          <img src="/img/x.svg" />
        </div>
        <div class="popup-body">
          <div id="qrcode" class="p-3 bg-white"></div>
        </div>
        <p class="text-xl text-center">
          Scan this code with your phone to automatically open the app with the
          same settings in your browser.
        </p>
      </div>
      <div
        id="popup-duck"
        class="hidden popup rounded-3xl p-7 flex flex-col items-center justify-between"
      >
        <h2 class="text-4xl font-bold">Talk to the duck!</h2>
        <div class="popup-close">
          <img src="/img/x.svg" />
        </div>
        <div class="popup-body">
          <img src="/img/ducky.png" alt="rubber duck" />
        </div>
        <p class="text-xl text-center">
          Talk to it about your problems, possible solutions, and how you got to
          the point you are.
        </p>
      </div>
      <div
        id="popup-tasks"
        class="hidden popup rounded-3xl p-7 flex flex-col items-center justify-between"
      >
        <h2 class="text-4xl font-bold">Tasks</h2>
        <div class="popup-close">
          <img src="/img/x.svg" />
        </div>
        <div class="popup-body"></div>
      </div>
    </div>
  );
};

export default Popup;
