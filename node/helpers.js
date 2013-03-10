// helpers.js

var capitalize = function capitalize(string) {
   return string.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
}


var heredoc = function hereDoc(f) {
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
}



module.exports = {
	capitalize: capitalize,
	heredoc: heredoc
}

