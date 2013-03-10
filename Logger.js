var Log4JS = require("log4js");

var LOG_FILE = './logs/wsproxy.log';
var LOG_LEVEL = 'TRACE';

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
