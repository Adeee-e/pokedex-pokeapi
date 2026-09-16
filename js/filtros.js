'use strict';

async function filtros(){
    const url_Tipos = `https://pokeapi.co/api/v2/type`;
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

function inverterValorElemento(tipoSelecionado) {

    let selecionados = fifoFiltroTipo.filter(
        tipo => tipo !== null
    );

    const indice = selecionados.indexOf(tipoSelecionado);

    // Se já estiver selecionado, remove.
    if (indice !== -1) {

        selecionados.splice(indice, 1);

    } else {

        // Permitimos no máximo dois filtros.
        // Se já houver dois, removemos o mais antigo.
        if (selecionados.length === 2) {
            selecionados.shift();
        }

        selecionados.push(tipoSelecionado);
    }


    // Atualiza o estado dos dois filtros.
    fifoFiltroTipo[0] = selecionados[0] ?? null;
    fifoFiltroTipo[1] = selecionados[1] ?? null;


    // Atualiza o objeto usado pela aparência dos botões.
    for (const tipo in filtroTipo) {
        filtroTipo[tipo] = selecionados.includes(tipo);
    }


    // Sempre volta para a primeira página quando o filtro muda.
    pagina = 0;

    document.getElementById("pageN").value = pagina;


    atualizarAparenciaFiltroTipos();

    buscaApi();
}

function atualizarAparenciaFiltroTipos() {

    const filtrosAtivos = fifoFiltroTipo.filter(tipo => tipo !== null);
    const nenhumFiltroAtivo = filtrosAtivos.length === 0;

    for (const tipo in filtroTipo) {

        const botao = document.getElementById(`filtro_${tipo}`);

        if (!botao) {
            continue;
        }

        //sem filtro ativo
        if (nenhumFiltroAtivo) {

            botao.style.backgroundColor = cores(tipo);
            botao.style.color = "black";

        } 
        //com filtro ativo
        else if (filtroTipo[tipo]) {

            botao.style.backgroundColor = cores(tipo);
            botao.style.color = "black";

        } else {

            botao.style.backgroundColor = cores("off");
            botao.style.color = "white";
        }
    }
}
