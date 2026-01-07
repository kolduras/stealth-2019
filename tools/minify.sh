#!/usr/bin/env node

var cmdRegPack = require('regpack').cmdRegPack;
var fs = require('fs');
var path = require('path');

var argv = (function() {
    var opts = {};
    var opt;
    var re = /^--(\w+)=(.+)$/;
    var args = process.argv.slice(2);

    for (var i = 0; i < args.length; i++)
        if (opt = re.exec(args[i])) {
            opts[opt[1]] = opt[2];
        }
    return opts;
})();


var inStream = process.stdin;
var outStream = process.stdout;
var sourceCode = '';

(function(){
    var sourceFileName;
    var destinationFileName;

    if (argv['in']){
        sourceFileName = path.resolve(argv['in']);
        if(fs.existsSync(sourceFileName)){
            inStream = fs.createReadStream(sourceFileName, { encoding: 'utf8' });
        }
        else {
            console.log("Input file not found");
            process.exit();
        }
    }
    if (argv['out']){
        destinationFileName = path.resolve(argv['out']);
        outStream = fs.createWriteStream(destinationFileName)
        if (!outStream){
            console.log("Can\'t create output file");
            process.exit();
        }
    }
})();

inStream.on('data', function(data){
    sourceCode += data.toString();
});

inStream.on('end', function(){
    outStream.write(cmdRegPack(sourceCode, {
      crushGainFactor: 1,
      crushLengthFactor: 0,
      crushCopiesFactor: 0
    }), 'utf8');
});
