//     

import * as server from './server/real_server';
import * as shell from 'shelljs';

//shell.exec("tsc -w -p public",{async:true});

server.start();

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
