// https://github.com/Belphemur/node-json-db

var JsonDB = require('node-json-db');
var fs = require('fs');

const exec = require('child_process').exec;
//const { exec } = require('child_process');

//The second argument is used to tell the DB to save after each push
//If you put false, you'll have to call the save() method.
//The third argument is to ask JsonDB to save the database in an human readable format. (default false)
var db = new JsonDB("../genetic/06112017generation0", true, false);

// From a particular DataPath
//var data = db.getData("/combinations");
//var data = db.getData("/population");
var data = db.getData("/");

console.log(data.population[0].chromosome);

var dir = '../model/generation'+data.generation;

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


/*
var fee = data.population[0].positive_feedback;
console.log("-->",fee);

db.push("/population/population[0]/positive_feedback",fee+1);

var data = db.getData("/population");

console.log(data);
var fee = data.population[0].positive_feedback;
console.log("-->",fee);
*/
// console.log(data.population[0].chromosome);

for (var i = 0, len = data.population.length; i < len; i++) {

  command = "openscad -o ../model/generation"+data.generation+"/out"+i+".stl -D 'genome_in = ["+ data.population[i].chromosome +"]' --render ../model/model4_no_orientation.scad"


  console.log(command);

  exec(command, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log("error");
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}
