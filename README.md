
# Youtube-Video-Time-Saver
Simple user script for retaining the video playback time across page reloads and browser restarts. For those who want to pause videos and continue watching them later.
On the end of the video the start time will be removed so the video will start from the beginning on reload.

## Installation
[Click here to install]( https://raw.githubusercontent.com/Robbendebiene/Youtube-Video-Time-Saver/master/youtube-video-time-saver.user.js)

## Options
You can specify a rewind time by changing the **REWIND_TIME** constant.

## FAQ
**Why is the script injected in the entire youtube website and not just youtube.com/watch?**
Because youtube doesn't reload the website when you for example click on a video in your subscriptions feed. It just updates the history/url. Therefore the script would only be injected if you reload the video page or visit it directly.
