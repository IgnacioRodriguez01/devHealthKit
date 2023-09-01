import React from 'react'

const MainPage = () => {
  return (
    <section class="p-10">
          <h1 class="text-4xl font-bold">devHealthKit</h1>
          <p>A collection of tools that help you keep good habits while being on the computer.</p>
      
          <div class="timer-cont mt-10">
            <div id="pomo" class="timer tool flex flex-col p-5 rounded-3xl">
                  <h3 class="title text-2xl">Pomodoro</h3>
                  <div class="sync hidden">
                        <img src="/img/stopwatch.svg" alt="play/pause"/>
                  </div>
                  <p class="stitle text-xl">focus</p>
                  <div class="main">
                        <span class="counter font-bold">25:00</span>
                  </div>
                  <div class="flex justify-between items-end">
                        <div class="pomo-control flex">
                              <div class="pomo-focus text-2xl mr-4 p-1 w-9 h-9 text-center rounded-md">25</div>
                              <div class="pomo-br text-2xl mr-4 p-1 w-9 h-9 text-center rounded-md">5</div>
                              <div class="pomo-lbr text-2xl mr-4 p-1 w-9 h-9 text-center rounded-md">15</div>
                        </div>
                        <div class="flex justify-end">
                              <div class="ml-2 control start"></div>
                              <div class="ml-2 control stop hidden"></div>
                        </div>
                  </div>
            </div>
            <div id="post" class="timer tool flex flex-col p-5 rounded-3xl">
                  <h3 class="title text-2xl">Posture check</h3>
                  <div class="sync">
                        <img src="../../public/img/stopwatch.svg" alt="play/pause"/>
                  </div>
                  <p class="stitle text-xl">every</p>
                  <div class="main">
                        <span class="counter font-bold">15:00</span>
                  </div>
                  <div class="flex justify-end">
                        <div class="ml-2 control start"></div>
                        <div class="ml-2 control stop hidden"></div>
                  </div>
            </div>
            <div id="eye" class="timer tool flex flex-col p-5 rounded-3xl">
                  <h3 class="title text-2xl">Eye relax</h3>
                  <div class="sync">
                        <img src="../../public/img/stopwatch.svg" alt="play/pause"/>
                  </div>
                  <div class="main">
                        <p class="stitle text-xl">every</p>
                        <p class="counter-evr font-bold text-6xl">20:00</p>
                        <div class="counter-for eye-20">
                              <p class="stitle text-xl">for</p>
                              <p class="stitle text-xl">at</p>
                              <p class="counter-for font-bold text-5xl">0:20</p>
                              <p class="counter-for font-bold text-4xl">20ft</p>                              
                        </div>

                        <div class="counter font-bold text-sm">1</div>
                  </div>
                  <div class="flex justify-end">
                        <div class="ml-2 control start"></div>
                        <div class="ml-2 control stop hidden"></div>
                  </div>
            </div>
            <div id="actbr" class="timer tool flex flex-col p-5 rounded-3xl">
                  <h3 class="title text-2xl">Active breaks</h3>
                  <div class="sync">
                        <img src="../../public/img/stopwatch.svg" alt="play/pause"/>
                  </div>
                  <div class="main">
                        <p class="stitle text-xl">every</p>
                        <p class="counter-evr font-bold text-6xl">1:00:00</p>
                        <p class="stitle text-xl">for</p>
                        <p class="counter-for font-bold text-6xl">05:00</p>

                        <div class="counter font-bold text-sm">1</div>
                  </div>
                  <div class="flex justify-end">
                        <div class="ml-2 control start"></div>
                        <div class="ml-2 control stop hidden"></div>
                  </div>
            </div>
            <div id="duck" class="tool flex flex-col p-5 rounded-3xl">
                  <h3 class="title text-2xl">Rubber Duck</h3>
                  <div class="main text-center" onclick="duckPopup.open()">
                        <span class="font-bold text-5xl">Talk to</span>
                        <div class="inline-block ml-1">
                              <img src="../../public/img/chat.svg" alt="play/pause"/>
                        </div>
                        <span class="font-bold text-5xl">the</span>
                        <span class="font-bold text-5xl ml-1 text-yellow-400">duck</span>
                  </div>
            </div>
            <div id="list" class="tool flex flex-col p-5 rounded-3xl">
                  <h3 class="title text-2xl">Tasks list</h3>
                  <p class="stitle text-xl">today</p>
                  <div class="main list">
                        <label class="c-contain">
                              <span>TODO1</span>
                              <input type="checkbox" />
                              <div class="b-input"></div>
                        </label>
                        <label class="c-contain">
                              <span>This is a descriptive todo item bla bla</span>
                              <input type="checkbox" />
                              <div class="b-input"></div>
                        </label>
                        <label class="c-contain">
                              <span>TODO2</span>
                              <input type="checkbox" />
                              <div class="b-input"></div>
                        </label>
                        <label class="c-contain">
                              <span>TODO3</span>
                              <input type="checkbox" />
                              <div class="b-input"></div>
                        </label>
                        <label class="c-contain">
                              <span>TODO4</span>
                              <input type="checkbox" />
                              <div class="b-input"></div>
                        </label>
                        
                  </div>
                  <div class="flex justify-end">
                        <div class="ml-2 control add" onclick="tasksPopup.open()"></div>
                  </div>
            </div>
            <div id="timeradd" class="tool flex rounded-3xl">
                  <span class="m-auto text-9xl font-extralight">+</span>
            </div>
        </div>
            {/* <!-- only for test app.js to work, temporarily --> */}
            <div class="hidden" id="on">title on</div>
            <div class="hidden" id="off">title off</div>
            <div class="hidden" id="onfav">fav on</div>
            <div class="hidden" id="offfav">fav off</div>
    </section>
  )
}

export default MainPage