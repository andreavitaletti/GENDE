// [inibitore, orientamento,  raggio, facce, altezza]
genome = [1,45,9,3,3,0,123,5,5,6,1,34,7,8,9,1,197,5,4,6,0,281,7,3,4,0,12,4,7,8,1,123,8,17,9];
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
                    circle(raggio,$fn=facce);
    }

}


