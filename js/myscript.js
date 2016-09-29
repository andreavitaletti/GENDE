
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

    var population_size;
    var population;
    var round;
    var generation;
    var experiment;
    var combinations;
    var individual_left;
    var individual_right;


    // Attach an asynchronous callback to read the data at our posts reference
rootRef.on("value", function(snapshot) {
  var test = snapshot.val();
  population_size = test.population.length;
  population = test.population;
  round = test.round;
  generation = test.current_generation;
  experiment = test.current_experiment;
  combinations = test.combinations;
  console.log(test);
  console.log(combinations[experiment]);
  console.log("population size:"+population_size);
  individual_left = population[combinations[experiment][0]];
  individual_right = population[combinations[experiment][1]];
  console.log(individual_left);
  console.log(individual_right);
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


// http://stackoverflow.com/questions/33569688/change-default-canvas-size-in-matterjs

function myFunction() {
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

var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
canvas1.addEventListener("click", test1, false);
canvas2.addEventListener("click", test2, false);
/*
function test1(){
    alert("canvas1");
    firebase.database().ref('values/').push({
      vasalue: "canvas1"
    });
}

function test2(){
    alert("canvas2");
    firebase.database().ref('values/').push({
      vasalue: "canvas2"
    });
}


function test1(){
    alert("canvas1");
    firebase.database().ref('individuals/1/').update({
      fitness: 200
    });
}

function test2(){
    alert("canvas2");
    firebase.database().ref('values/').push({
      vasalue: "canvas2"
    });
}
*/

function test1(){
    alert("canvas1");
    firebase.database().ref().update({
      current_experiment:experiment+1
    });
}

function test2(){
    alert("canvas2");
    firebase.database().ref().update({
      current_experiment:experiment+1
    });
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
  canvas: canvas1,
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
  canvas: canvas2,
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
var chromosome =[8, 10];
console.log(individual_right.chromosome.pieces);
Common._seed = chromosome[0];
var bridge = Composites.stack(150, top, chromosome[1], 1, 10, 10, function(x, y) {
         // return Bodies.rectangle(x, y, 50, 20, { collisionFilter: { group: group } });
         return Bodies.polygon(x, y, Math.round(Common.random(1, 8)), Common.random(20, 40));
     });

Composites.chain(bridge, 0.5, 0, -0.5, 0, { stiffness: 0.9 });

/////////////////
// individual 2//
/////////////////
//var chromosome =[nume_elem, seed]
var chromosome =[5, 33]
Common._seed = chromosome[1];
var bridge1 = Composites.stack(150, top, chromosome[0], 1, 10, 10, function(x, y) {
         // return Bodies.rectangle(x, y, 50, 20, { collisionFilter: { group: group } });
         return Bodies.polygon(x, y, Math.round(Common.random(1, 8)), Common.random(20, 40));
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
