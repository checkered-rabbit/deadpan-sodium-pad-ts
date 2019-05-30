//         

import * as server from './server_real';
import * as shell from 'shelljs';

//shell.exec("tsc -w -p public",{async:true});

console.log("node running ",new Date().toLocaleTimeString());

shell.mkdir('-p','.data');

//shell.exec('node node_modules/.bin/tsc -w -p public',{async:true});

server.start();
//console.log(shell.exec("cat nohup.out"));

let p = shell.exec("tail -f start.log",{async:true});
if (process.env.TAIL2CON) {
p.stdout.on('data', function(data) {
  console.log("tail: " + data.replace(/\n(?!$)/g,'\ntail: '));
});
}


//console.log(''+new Date(), "running");

/*
var shell = require("shelljs");

var r = shell.exec('pgrep -f "tsc"');
console.log(r.stdout);
if (r.stdout.match("\n.*\n")) {
  console.log("watchers running");
  require('./server/real_server');
} else {
  console.log("compiling myself " + new Date());
  shell.exec("tsc -w -p public",{async:true});
  
  //require('ts-node').register({  });
  //shell.exec("tsc -p server");
  
  require('./server/real_server.tsx');
  
  console.log("compiled " + new Date());
  //shell.exec("nohup tsc -w -p server&");
}


*/
