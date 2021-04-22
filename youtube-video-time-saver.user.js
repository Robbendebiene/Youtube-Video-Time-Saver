
// ==UserScript==
// @name                Youtube-Video Time Saver
// @description         Simple user script for retaining the video playback time across page reloads and browser restarts. For those who want to pause videos and continue watching them later.
// @version             1.0.1
// @namespace           https://github.com/Robbendebiene/Youtube-Video-Time-Saver
// @updateURL           https://raw.githubusercontent.com/Robbendebiene/Youtube-Video-Time-Saver/master/youtube-video-time-saver.user.js
// @icon                https://www.youtube.com/favicon.ico
// @match               *://www.youtube.com/*
// @run-at              document-end
// ==/UserScript==

// customizable constants

// specify an optional rewind time in seconds
const REWIND_TIME = 0;
// switch to "timeupdate" if you want to constantly save the video timestamp
const SAVE_TIMESTAMP_EVENT = "pause";
// css selector for video player element
const VIDEO_SELECTOR_STRING = "#movie_player video";

// global variables

let videoPlayer;

main();

window.addEventListener("yt-navigate-finish", main);

function main () {
  if (window.location.pathname.startsWith("/watch")) {
    videoPlayer = document.querySelector(VIDEO_SELECTOR_STRING);
    videoPlayer.addEventListener(SAVE_TIMESTAMP_EVENT, update);
    // update on timeline changes
    videoPlayer.addEventListener("seeking", update);
    videoPlayer.addEventListener("ended", clearYTVideoStartTimeParameter);
  }
};


function update () {
  if (window.location.pathname.startsWith("/watch")) {
    const startTime = Math.max(videoPlayer.currentTime - REWIND_TIME, 0);
    setYTVideoStartTimeParameter(startTime);
  }
}


function setYTVideoStartTimeParameter (startTime) {
  startTime = Math.floor(startTime);
  const currentURL = new URL(window.location.href);
  currentURL.searchParams.set("t", startTime);
  window.history.replaceState(null, null, currentURL.href);
}


function clearYTVideoStartTimeParameter () {
  const currentURL = new URL(window.location.href);
  currentURL.searchParams.delete("t");
  window.history.replaceState(null, null, currentURL.href);
}
