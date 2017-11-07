// [inibitore,  raggio, facce, altezza]
genome_in = [];
genome = genome_in;
gene_len=4;
function altezz(index) = ( index == 0 ? 0 : genome[index-gene_len]*genome[index-1] + altezz(index-gene_len) ); 

raggi = [ for (i = [1 : gene_len : len(genome)]) genome[i] ];
min_r = min(raggi);

translate([0,0,-altezz(len(genome))/2]){
for (g=[0:gene_len:len(genome)-gene_len]){
    inibitore = genome[g];
    raggio = genome[g+1];
    facce = genome[g+2];
    altezza = genome[g+3];
    if(inibitore==1){ 
        translate([0,0,altezz(g)])
            linear_extrude(height = altezza)
                    difference(){
                        circle(raggio,$fn=facce);
                        circle(min_r-2,$fn=30);
                    }
    }

}

//tappo

 cylinder(h = 3, r = min_r-1, $fn=30);
}