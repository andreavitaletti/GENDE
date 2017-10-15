// [inibitore, facce, altezza]
genome = [1,2,3,0,5,6,1,8,9,1,5,6,0,3,4,0,7,8,1,7,9];
gene_len=3;
function altezz(index) = ( index == 0 ? 0 : genome[index-3]*genome[index-1] + altezz(index-3) ); 

for (g=[0:gene_len:len(genome)-gene_len]){
    
    echo (altezz(g));

    inibitore = genome[g];
    facce = genome[g+1];
    altezza = genome[g+2];
    if(inibitore==1){ 
        // echo(genome[g], genome[g+1], genome[g+2]);
        translate([0,0,altezz(g)])
            cylinder(h = altezza, r = facce);
    }

}


