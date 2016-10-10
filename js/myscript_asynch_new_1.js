    // Get a reference to the database service
    var database;
    var rootRef;

    var population_size;
    var population;
    var round;
    var generation;
    var experiment;
    var combinations;
    var individual_left;
    var individual_right;
    var index_left;
    var index_right;
    var experiment_size;





function getData(callback){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAxaiPOZxePv9dluQAesWhoKob9e_PZjEo",
    authDomain: "gende-9e642.firebaseapp.com",
    databaseURL: "https://gende-9e642.firebaseio.com",
    storageBucket: "",
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();
  var rootRef = firebase.database().ref();
  // Attach an asynchronous callback to read the data at our posts reference
//rootRef.on("value", function(snapshot) {
rootRef.once("value", function(snapshot) {
var test = snapshot.val();
population_size = test.population.length;
population = test.population;
round = test.round;
generation = test.generation;
experiment = test.experiment;
combinations = test.combinations;
experiment_size = combinations.length;
console.log(test);
console.log(combinations[experiment]);
console.log("population size:"+population_size);
console.log("experiment size:"+experiment_size);
index_left=combinations[experiment][0];
index_right=combinations[experiment][1];
individual_left = population[index_left];
individual_right = population[index_right];
console.log("left:"+individual_left);
console.log("right"+individual_right);
console.log("got data");
document.getElementById("info").innerHTML = "<h2> Generation "+generation+" - Experiment "+experiment+" - Round "+round+"</h2>";
callback();
}, function (errorObject) {
console.log("The read failed: " + errorObject.code);
});



}

// http://stackoverflow.com/questions/33569688/change-default-canvas-size-in-matterjs

function performExperiment() {
  console.log("perform Experiment");
  // module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Composites = Matter.Composites,
  Common = Matter.Common,
  Constraint = Matter.Constraint;

// create an engine
var engine = Engine.create(),
    world = engine.world,
    group = Body.nextGroup(true);

    // create an engine
var engine1 = Engine.create(),
    world1 = engine1.world,
    group1 = Body.nextGroup(true);

var left_canvas = document.getElementById('left_canvas');
var right_canvas = document.getElementById('right_canvas');
left_canvas.addEventListener("click", test1, false);
right_canvas.addEventListener("click", test2, false);


function test1(){
    //alert("left_canvas, age: "+age+" gender: "+gender);
    //var myElement = document.getElementById("email11");
    var email = document.forms["myForm"]["email"].value;
    var age = document.forms["age"]["age"].value;
    var gender = document.forms["gender"]["optradio"].value;
    alert("Grazie di aver partecipato. Seguici su http://www.gende.it");
    if (age!=="" || email!="" || gender!="") {
      alert("scrivo");
    firebase.database().ref('users/').push({
        email:email,
        age:age,
        gender:gender,
        individual:[generation,experiment,round,index_left]
      });
    }
    if (experiment === experiment_size - 1){
      experiment = 0;
      round=round+1;
      firebase.database().ref().update({
        round:round
      });
    }
    else {
      experiment = experiment+1;
    }

    firebase.database().ref().update({
      experiment:experiment
    });

    firebase.database().ref('population/'+index_left+'/').update({
      positive_feedback:individual_left.positive_feedback+1
    });
    window.location.reload(false);

}

function test2(){
    //alert("right_canvas, age: "+age+" gender: "+gender);
    var email = document.forms["myForm"]["email"].value;
    var age = document.forms["age"]["age"].value;
    var gender = document.forms["gender"]["optradio"].value;
    alert("Grazie di aver partecipato. Seguici su http://www.gende.it");
    if (age!=="" || email!="" || gender!="") {
      alert("scrivo");
    firebase.database().ref('users/').push({
        email:email,
        age:age,
        gender:gender,
        individual:[generation,experiment,round,index_right]
      });
    }



    if (experiment === experiment_size - 1){
      experiment = 0;
      round=round+1;
      firebase.database().ref().update({
        round:round
      });
    }
    else {
      experiment = experiment+1;
    }

    firebase.database().ref().update({
      experiment:experiment
    });

    firebase.database().ref('population/'+index_right+'/').update({
      positive_feedback:individual_right.positive_feedback+1
    });

    window.location.reload(false);
}


var width = 300,
    height = 600;
/*
canvas.width = width;
canvas.height = height;
*/
// create a renderer
var render = Render.create({
  //element: document.body,
  element: document.getElementById("exp"),
  canvas: left_canvas,
  engine: engine,
  options: {
    width: width,
    height:height,
    pixelRatio: 1,
    background: '#fafafa',
    wireframeBackground: '#fff',
    hasBounds: false,
    enabled: true,
    wireframes: false,
    showSleeping: true,
    showDebug: false,
    showBroadphase: false,
    showBounds: false,
    showVelocity: false,
    showCollisions: false,
    showSeparations: false,
    showAxes: false,
    showPositions: false,
    showAngleIndicator: false,
    showIds: false,
    showShadows: false,
    showVertexNumbers: false,
    showConvexHulls: false,
    showInternalEdges: false,
    showMousePosition: false
}
});

// create a renderer
var render1 = Render.create({
  //element: document.body,
  element: document.getElementById("exp1"),
  canvas: right_canvas,
  engine: engine1,
  options: {
    width: width,
    height:height,
    pixelRatio: 1,
    background: '#fafafa',
    wireframeBackground: '#fff',
    hasBounds: false,
    enabled: true,
    wireframes: false,
    showSleeping: true,
    showDebug: false,
    showBroadphase: false,
    showBounds: false,
    showVelocity: false,
    showCollisions: false,
    showSeparations: false,
    showAxes: false,
    showPositions: false,
    showAngleIndicator: false,
    showIds: false,
    showShadows: false,
    showVertexNumbers: false,
    showConvexHulls: false,
    showInternalEdges: false,
    showMousePosition: false
}
});

/////////////////
// individual 1//
/////////////////
//var chromosome =[nume_elem, seed]
var top = 0;
var elements = 0;
var active_chromosome=[];

for (var i = 2; i < individual_left.chromosome.length; i=i+3) {
    console.log(i+"-->"+individual_left.chromosome[i]);
    if (individual_left.chromosome[i]===1){
      elements++;
      active_chromosome.push(individual_left.chromosome[i-2]);
      active_chromosome.push(individual_left.chromosome[i-1]);
    }
}

console.log("Active Chriomosome -->"+active_chromosome);
//var elements = individual_left.chromosome.length/2;

console.log("elements -->"+elements);

var bridge = Composites.stack(150, top, elements, 1, 10, 10, function(x, y, i) {
         // return Bodies.rectangle(x, y, 50, 20, { collisionFilter: { group: group } });
/*

Matter.Bodies.polygon(x, y, sides, radius, [options]) → Body
Creates a new rigid body model with a regular polygon hull with the given number of sides. The options parameter is an object that specifies any properties you wish to override the defaults. See the properties section of the Matter.Body module for detailed information on what you can pass via the options object.

*/
        // console.log("hello "+i);
        console.log(active_chromosome[2*i]+" "+active_chromosome[2*i+1])
        return Bodies.polygon(x, y, active_chromosome[2*i], active_chromosome[2*i+1]);


     });

Composites.chain(bridge, 0.5, 0, -0.5, 0, { stiffness: 0.9 });

/////////////////
// individual 2//
/////////////////
//var chromosome =[nume_elem, seed]

var active_chromosome=[];
var elements = 0;

for (var i = 2; i < individual_right.chromosome.length; i=i+3) {
    console.log("right "+i+"-->"+individual_right.chromosome[i]);
    if (individual_right.chromosome[i]===1){
      elements++;
      active_chromosome.push(individual_right.chromosome[i-2]);
      active_chromosome.push(individual_right.chromosome[i-1]);
    }
}

console.log("Active Chriomosome -->"+active_chromosome);
//var elements = individual_left.chromosome.length/2;

console.log("elements -->"+elements);

var bridge1 = Composites.stack(150, top, elements, 1, 10, 10, function(x, y, i) {
         // return Bodies.rectangle(x, y, 50, 20, { collisionFilter: { group: group } });
         // return Bodies.polygon(x, y, Math.round(Common.random(1, 8)), Common.random(20, 40));
         console.log(active_chromosome[2*i]+" xxxx <<<<"+active_chromosome[2*i+1])
         return Bodies.polygon(x, y, active_chromosome[2*i], active_chromosome[2*i+1]);
     });

Composites.chain(bridge1, 0.5, 0, -0.5, 0, { stiffness: 0.9 });


// add all of the bodies to the world
//World.add(engine.world, [boxA, boxB, ground]);

World.add(world, [
           bridge,
           //Bodies.rectangle(80, 440, 120, 280, { isStatic: true }),
           //Bodies.rectangle(720, 440, 120, 280, { isStatic: true }),
           // Bodies.circle(440, 100, 120, { isStatic: true }),
           Constraint.create({ pointA: { x: 150, y: top }, bodyB: bridge.bodies[0], pointB: { x: -25, y: 0 } }),
           //Constraint.create({ pointA: { x: 660, y: 300 }, bodyB: bridge.bodies[8], pointB: { x: 25, y: 0 } }),
           //stack
       ]);

World.add(world1, [
                  bridge1,
                  //Bodies.rectangle(80, 440, 120, 280, { isStatic: true }),
                  //Bodies.rectangle(720, 440, 120, 280, { isStatic: true }),
                  // Bodies.circle(440, 100, 120, { isStatic: true }),
                  Constraint.create({ pointA: { x: 150, y: top }, bodyB: bridge1.bodies[0], pointB: { x: -25, y: 0 } }),
                  //Constraint.create({ pointA: { x: 660, y: 300 }, bodyB: bridge.bodies[8], pointB: { x: 25, y: 0 } }),
                  //stack
              ]);

// run the engine
Engine.run(engine);
Engine.run(engine1);

// run the renderer
Render.run(render);
Render.run(render1);
}
