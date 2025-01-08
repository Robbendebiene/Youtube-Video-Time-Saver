// ==UserScript==
// @name                Youtube-Video Time Saver
// @description         Simple user script for retaining the video playback time across page reloads and browser restarts. For those who want to pause videos and continue watching them later.
// @version             1.0.1
// @namespace           https://github.com/Robbendebiene/Youtube-Video-Time-Saver
// @updateURL           https://raw.githubusercontent.com/Robbendebiene/Youtube-Video-Time-Saver/master/youtube-video-time-saver.user.js
// @icon                https://www.youtube.com/favicon.ico
// @match               *://www.youtube.com/*
// @match               *://www.youtube-nocookie.com/*
// @run-at              document-end
// ==/UserScript==

// customizable constants

// specify an optional rewind time in seconds
const REWIND_TIME = 0;
// switch to "timeupdate" if you want to constantly save the video timestamp
const SAVE_TIMESTAMP_EVENT = "pause";
// css selector for video player element
const VIDEO_SELECTOR_STRING = "#movie_player video";

// this is used to run after any page tasks like load event handlers
setTimeout(main, 0);  
window.addEventListener("yt-navigate-finish", main);

function main () {
  if (isVideoURL()) {
    const videoPlayer = document.querySelector(VIDEO_SELECTOR_STRING);
    videoPlayer.addEventListener(SAVE_TIMESTAMP_EVENT, handleChange);
    // update on timeline changes
    videoPlayer.addEventListener("seeking", handleChange);
    videoPlayer.addEventListener("ended", handleEnd);
  }
};

function handleChange (event) {
  if (isVideoURL()) {
    const param = getYTVideoStartTimeURLParameterName();
    const startTime = Math.max(event.target.currentTime - REWIND_TIME, 0);
    setYTVideoStartTimeURLParameter(param, startTime);
  }
}

function handleEnd (event) {
  if (isVideoURL()) {
    const param = getYTVideoStartTimeURLParameterName();
    clearYTVideoStartTimeURLParameter(param);
  }
}

function getYTVideoStartTimeURLParameterName() {
  if (isDirectVideoURL()) {
    return "t";
  }
  else if (isEmbeddedVideoURL()) {
    return "start";
  }
}

function setYTVideoStartTimeURLParameter (param, startTime) {
  const newURL = new URL(window.location);
  newURL.searchParams.set(param, Math.floor(startTime));
  window.history.replaceState(null, null, newURL);
}

function clearYTVideoStartTimeURLParameter (param) {
  const newURL = new URL(window.location);
  newURL.searchParams.delete(param);
  window.history.replaceState(null, null, newURL);
}

function isVideoURL () {
   return isDirectVideoURL() || isEmbeddedVideoURL();
}

function isDirectVideoURL () {
   return window.location.pathname.startsWith("/watch");
}

function isEmbeddedVideoURL () {
   return window.location.pathname.startsWith("/embed");
}
