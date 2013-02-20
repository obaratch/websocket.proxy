
// undersocre
var _ = require('underscore');
var _str = require('underscore.string');

// interface
var utils = {
	joinArray: joinArray,
	stringifyArray: stringifyArray
};
_.extend(utils, _str);

function joinArray(separator, array){
	if(_.isEmpty(array)) return '';
	var line = '',
		first = true;
	for(var i=0; i<array.length; i++){
		if(first){
			first = false;
		} else {
			line += separator;
		}
		line += array[i];
	}
	return line;
};

function stringifyArray(array){
	return '[' + joinArray(', ', array) + ']';
};

module.exports = utils;
