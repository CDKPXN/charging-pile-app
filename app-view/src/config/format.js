function format() {
	if(arguments.length == 0) return this;
	for(var s = arguments[0], i = 1; i < arguments.length; i++)
		s = s.replace(new RegExp("\\{" + (i-1) + "\\}", "g"), arguments[i]);
	return s;
};

module.exports = {
    format
}
