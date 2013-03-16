var fs = require('fs');
var Log4JS = require('log4js');

var LOG_DIR = './logs';
var LOG_FILE = LOG_DIR + '/wsproxy.log';
var LOG_LEVEL = 'TRACE';

if(!fs.existsSync(LOG_DIR)){
	fs.mkdir(LOG_DIR);
	var realpath = fs.realpathSync(LOG_DIR);
	console.log("created log directory at:" + realpath);
}

Log4JS.configure({
	appenders:[
		{
			type: 'console',
			layout: {
				type: 'pattern',
				pattern: '%[[%d][%p][%c]%]%m'
			}
		}, {
			type: 'file',
			filename: LOG_FILE,
			maxLogSize: 1024 * 1024, // 1MB
			backups: 5,
			pattern: '-yyyy-MM-dd'
		}
	],
	replaceConsole: true
});

module.exports = function(logname){
	var logger = Log4JS.getLogger(logname);
	logger.setLevel(LOG_LEVEL);
	return logger;
}
