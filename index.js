var fs = require('fs')
	, util = require('util')
	, events = require('events');


function Watcher(file, interval){
	if (isNaN(interval)) {
		this.__interval = 5007;
	}else{
		this.__interval = interval;
	};
	this.file = file;
}

util.inherits(Watcher, events.EventEmitter);

//previous and current size of the file being watched
Watcher.prototype.__read = function(psize, csize){
	var self = this;
	var size = csize - psize;
	var buffer = new Buffer(size);
	var filesArray = new Array();
	var durationRegEx = new RegExp("^#EXTINF:(\d*\.?\d+),$");
	var regExp = new RegExp("^[^#].+\.ts$",'i');

	fs.open(self.file, 'r', function(err, fd){
		fs.read(fd,buffer,0,size,psize,function(err, bytesRead, buffer){
			if (err) throw err;
			var string = buffer.toString();
			var lines = string.split('\n');
			var tsDuration = 0;
			for (var line in lines) {
				if(durationRegEx.exec(lines[line]) !== null){
					tsDuration = m[1];
				}
				if(regExp.test(lines[line])){
					filesArray.push({fileName: lines[line], tsDuration: tsDuration});
				}
			};
			//Close file descriptor after read its content
			fs.closeSync(fd);
			self.emit("change",filesArray);
		});
	});
};

Watcher.prototype.listenFile = function(){
	var self = this;
	//curr, prev: fs.Stat Objects with inode info.
	fs.watchFile(this.file, { persistent: true, interval: self.__interval }, function (curr, prev) {
		self.__read(prev.size, curr.size);
	});
};

Watcher.prototype.stop = function(){
	fs.unwatchFile(this.file,"utf8");
};

module.exports = Watcher;
