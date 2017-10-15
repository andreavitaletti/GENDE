// [inibitore, raggio, facce, altezza]
genome = [1,9,3,3,0,5,5,6,1,7,8,9,1,5,4,6,0,7,3,4,0,4,7,8,1,8,17,9];
gene_len=4;
function altezz(index) = ( index == 0 ? 0 : genome[index-gene_len]*genome[index-1] + altezz(index-gene_len) ); 

for (g=[0:gene_len:len(genome)-gene_len]){
    
    echo (altezz(g));

    inibitore = genome[g];
    raggio = genome[g+1];
    facce = genome[g+2];
    altezza = genome[g+3];
    if(inibitore==1){ 
        // echo(genome[g], genome[g+1], genome[g+2]);
        translate([0,0,altezz(g)])
            linear_extrude(height = altezza)
                circle(raggio,$fn=facce);
    }

}


