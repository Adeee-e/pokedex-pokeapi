'use strict';

function retroceder(){
    if(pagina > 0){
        pagina--;
    }else{
        pagina= Math.floor(1025/24);    
    }
    document.getElementById("pageN").value = pagina;
    buscaApi();
}

function paginaIdentifier(){
    const seletor = document.getElementById("pageN").value;
    pagina = seletor;
    buscaApi();
}

function avancar(){    
    if(pagina >= Math.floor(1025/24)){
        pagina =0;
    }else{pagina++;}
    document.getElementById("pageN").value = pagina;
    buscaApi();
}
