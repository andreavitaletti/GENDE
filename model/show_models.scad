j = 40;
w = 25;
g = "generation0/";

translate([w,0,0]) text("0");
import(str(g,"out0.stl"));
translate([0,j,0]) import(str(g,"out1.stl"));
translate([w,j,0]) text("1");
translate([0,2*j,0]) import(str(g,"out2.stl"));
translate([w,2*j,0]) text("2");
translate([0,3*j,0]) import(str(g,"out3.stl"));
translate([w,3*j,0]) text("3");
translate([0,4*j,0]) import(str(g,"out4.stl"));
translate([w,4*j,0]) text("4");
translate([0,5*j,0]) import(str(g,"out5.stl"));
translate([w,5*j,0]) text("5");
translate([0,6*j,0]) import(str(g,"out6.stl"));
translate([w,6*j,0]) text("6");
translate([0,7*j,0]) import(str(g,"out7.stl"));
translate([w,7*j,0]) text("7");
translate([0,8*j,0]) import(str(g,"out8.stl"));
translate([w,8*j,0]) text("8");
translate([0,9*j,0]) import(str(g,"out9.stl"));
translate([w,9*j,0]) text("9");
