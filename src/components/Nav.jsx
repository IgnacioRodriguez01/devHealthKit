import React from "react";

const Nav = () => {
  return (
    <nav class="h-screen py-8 px-5 flex flex-col justify-between items-center">
      <div class="settings w-fit" onclick="settingsPopup.open()">
        <img src="/img/gear.svg" alt="play/pause" />
      </div>
      <div>
        <p id="sync" class="mt-10 text-3xl" onclick="qrSync()">
          sync
        </p>
        <p id="help" class="mt-10 text-3xl">
          help
        </p>
        <p id="tips" class="mt-10 text-3xl">
          +tips
        </p>
      </div>
    </nav>
  );
};

export default Nav;
