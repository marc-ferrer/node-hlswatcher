node-hlswatcher
===============

A node.js module that provides you with functionalities for m3u8 (hls) files watching.
it watches for changes on a m3u8 file and returns an array containing the name of the
ts files that have been created (and finished so they can be used) since the last
the module checked the m3u8 file.
Each time the module have detects a change on the m3u8 file it triggers an event.

The module is specially useful if you need to transcode a live video and send it to
a CDN.

## Install ##################################################################

Easiest install is via npm:

    $ npm install hls-watcher

## Source ###################################################################

hls-watcher Git repository is available on GitHub, which can be browsed at:

	https://github.com/MarcVancast/node-hlswatcher

and cloned with:

	$ git clone git://github.com/MarcVancast/node-hlswatcher.git

## Usage ####################################################################

//require
	var Watcher = require('hls-watcher');

//after the require the first step is to create an object that represents your watcher.
//the constructor requires a path to the m3u8 file you want to watch over.
//A second parameter can be used to set the interval of time (in ms) used for checking the file,
//if not provided or not a number the default value (5007) is used.
	
	var w1 = new Watcher('PATH/to/file.m3u8');
or
	var w1 = new Watcher('PATH/to/file.m3u8',8000);
	
//Once you have the object you need to call the method listenFile()

	w1.listenFile();

//When the module detects a change on the file it triggers an event "change" and returns
//an array containing the names of the ts files that have been created since the last time.
//Note that just the last created files are send, not all the ts files including the last ones,
//if you need to remember all of them you should store them in your own program.

	w1.on("change", function(data){
		//do things with ts files stored on data.
	});

//Remember to stop the listener at the end.

	w1.stop();

