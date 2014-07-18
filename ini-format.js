/**
 * ini configs formatter
 *
 * node ini-format.js ~/Documents/config.ini
 */
var fs = require('fs');

var format = function(text) {
    var longest = 0;
    var lines = [];
    text.split('\n').forEach(function(line) {
        var parts = line.split('=');
        if (parts.length > 1) {
            parts[0] = parts[0].replace(/[^\S\n]/g, '');
            parts[1] = parts[1].replace(/^\s+/, '');
            longest = Math.max(parts[0].replace(/^;+/, '').length, longest);
            line = parts.join('=');
        }
        lines.push(line);
    });
    lines.forEach(function(line, i) {
        var parts = line.split('=');
        if (parts.length < 2) return;
        parts[0] = parts[0] + Array(longest - parts[0].length + 2).join(' ');
        var matches = parts[0].match(/^;+/);
        lines[i] = parts.join(Array(1 + (matches ? matches[0].length : 0)).join(' ') + '= ');
    });
    return lines.join('\n');
};

process.argv.slice(2).forEach(function(filepath) {
    var contents = fs.readFileSync(filepath).toString();
    contents = format(contents);
    fs.writeFile(filepath, contents);
});


