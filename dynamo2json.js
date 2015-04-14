#! /usr/bin/env node

var unmarshalItem = require('dynamodb-marshaler').unmarshalItem;
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');


if (argv.i === undefined){
    usage();
    return;
}

var inputfile = argv.i;
var outputfile = argv.o;

if (outputfile === undefined){
    outputfile = inputfile + '.dyanmo';
}

var input = fs.readFileSync(inputfile, "utf8");
if (input === undefined){
    console.log('Error opeing ' + inputfile);
    return;
}

console.log("--- INPUT: " + input);
var inputjson = JSON.parse(input);
var output =  unmarshalItem(inputjson);
var outputjson = JSON.stringify(output);
console.log("--- OUTPUT: " + outputjson);

if (output === undefined){
    console.log('No output generated.');
    return;
}

fs.writeFileSync(outputfile, outputjson, 'utf8');

function usage(){
    console.log('no input parameters');
    console.log('usage: dynamo2json --i inputfile --o outputfile');
}

