// [inibitore, orientamento,  raggio, facce, altezza]
genome_in = [];
genome = genome_in;
gene_len=5;
function altezz(index) = ( index == 0 ? 0 : genome[index-gene_len]*genome[index-1] + altezz(index-gene_len) ); 

raggi = [ for (i = [2 : gene_len : len(genome)]) genome[i] ];
min_r = min(raggi);


for (g=[0:gene_len:len(genome)-gene_len]){
    inibitore = genome[g];
    orientamento = genome[g+1];
    raggio = genome[g+2];
    facce = genome[g+3];
    altezza = genome[g+4];
    if(inibitore==1){ 
        translate([0,0,altezz(g)])
            linear_extrude(height = altezza)
                rotate([0,0,orientamento])
                    difference(){
                        circle(raggio,$fn=facce);
                        circle(min_r-1,$fn=30);
                    }
    }

}

//tappo

 cylinder(h = 3, r = min_r-1, $fn=30);
