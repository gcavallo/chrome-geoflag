'use strict';

var zlib = require('zlib');

module.exports = function(grunt) {
	grunt.registerMultiTask('gz', function () {
		var done = this.async();

		var files = this.files.slice();

		(function process() {
			if(files.length <= 0) {
				done();
				return;
			}

			var file = files.pop();
			var data = grunt.file.read(file.src[0], { encoding: null });

			grunt.log.writeln('Decompressing ' + file.src[0] + ' to ' + file.dest + '...');

			zlib.gunzip(data, function(err, uncompressed) {
				grunt.file.write(file.dest, uncompressed);
				grunt.log.ok("Uncompressed file written to " + file.dest);
				process();
			})
		})();
	});
};
