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

generation = 1;
experiment = 1;
round = 3;

// get data on the population for a DB and select two individuals

individual_left = {
    "chromosome" : [ 9, 33, 0, 9, 38, 0, 4, 28, 0, 7, 2, 0, 5, 38, 0, 8, 20, 1, 8, 5, 1, 6, 17, 1 ],
    "positive_feedback" : 12
  };
individual_right = {
    "chromosome" : [ 6, 12, 1, 8, 3, 1, 5, 40, 1, 2, 40, 1, 8, 28, 0, 8, 17, 1, 7, 35, 1, 9, 33, 0 ],
    "positive_feedback" : 3
  };


document.getElementById("info").innerHTML = "<h2> Generation "+generation+" - Experiment "+experiment+" - Round "+round+"</h2>";

callback();


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
    alert("write data on the feedback in the DB")
    window.location.reload(false);

}

function test2(){
  alert("write data on the feedback in the DB")
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
