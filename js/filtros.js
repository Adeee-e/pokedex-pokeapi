'use strict';

async function filtros(){
    const url_Tipos = `http://pokeapi.co/api/v2/type`;
    const dadoTipos = await fetch(url_Tipos);
    const listaTipos= await dadoTipos.json();
    const div=document.getElementById("Caixa_Filtro");

    if(document.getElementById("Botao_Filtro_off")){
        document.getElementById("Botao_Filtro_off").id= "Botao_Filtro_on";

        div.style.width="500px";
        div.style.height="350px";

        for (const tipos of listaTipos.results) {
            if(tipos.name == "stellar" || tipos.name == "unknown"){continue}
            div.innerHTML+=`
                    <button class="filtro_Elemento" id="filtro_${tipos.name}" onclick="inverterValorElemento('${tipos.name}')" style="background-color:${cores(filtroTipo[tipos.name]?tipos.name:'off')}">
                        ${tipos.name}
                    </button>
                `;
    }
    }else if(document.getElementById("Botao_Filtro_on")){
        document.getElementById("Botao_Filtro_on").id= "Botao_Filtro_off";

        div.style.width="500px";
        div.style.height="34px";
        for(let tipos in filtroTipo){
            document.getElementById(`filtro_${tipos}`).remove();
        }
    }
}





function inverterValorElemento(x){
    // Verifica (as 2 casas) para ver se o elemento 'x' ja esta selecionado.
    // {TRUE} :> remove tal elemento 'x', e adiciona null a casa 0
    console.log()
    console.log(fifoFiltroTipo)
    if(fifoFiltroTipo[0] == x ){
        fifoFiltroTipo.splice(0,1,null);
        console.log(fifoFiltroTipo)
    }
    else if(fifoFiltroTipo[1] == x ){
        fifoFiltroTipo.splice(1,1);
        fifoFiltroTipo.splice(0,0,null);
        console.log(fifoFiltroTipo)
    }else{
        // Remove o primeiro elemento
        fifoFiltroTipo.splice(0,1);
        
        // Substitui o segundo elemento se 'filtroTipo' do elemento 'x' for TRUE por 'x'
        fifoFiltroTipo.splice(1,1,x);
        //console.log(`pos adicionar: {${fifoFiltroTipo[0]}, ${fifoFiltroTipo[1]}}`)
        
        // Os elementos que estiverem dentro de 'fifoFiltroTipo' tem o valor TRUE, ao contrario sera FALSE
        for(var i in filtroTipo){
            if(i == fifoFiltroTipo[0] || i == fifoFiltroTipo[1]){
               // console.log(`filtroTipo[${i}] = true;`)
                filtroTipo[i]= true;

            }else{
                filtroTipo[i]= false;
            }
            
        }
    }
    console.log("entrando no For")
    
    for(let i=0,y=1;i<17;i++){
    //    console.log(` - fifoFiltroTipo[${Object.keys(fifoFiltroTipo)}] = ${!fifoFiltroTipo[i]}`)
        if(!fifoFiltroTipo[i]){y++}
        
        if(y==17){for(let valores in filtroTipo){filtroTipo[valores]=!filtroTipo[valores];console.log(`filtroTipo[${valores}]=${filtroTipo[valores]}`)}}
    }
    console.log("saindo no For")
    console.log(fifoFiltroTipo)
    atualizarAparenciaFiltroTipos()

    buscaApi([fifoFiltroTipo[0],fifoFiltroTipo[1]]);
}






function atualizarAparenciaFiltroTipos(){
    for(var i in filtroTipo){
        document.getElementById(`filtro_${i}`).style["background-color"] = cores(filtroTipo[i]?i:'off');
        document.getElementById(`filtro_${i}`).style.color = filtroTipo[i]?"black":"white";
    }
}
