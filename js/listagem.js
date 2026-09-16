'use strict';

const buscaApi = async() => {

    console.log(`buscaApi([${fifoFiltroTipo[0]},${fifoFiltroTipo[1]}])`)
    document.getElementById("Caixa_Pokemon").innerHTML = "";

    const nomePokemon = document.getElementById('Pesquisa').value.trim().toLowerCase();
    var filtragem=false;
    var mostrar=[24*pagina, 24*(pagina+1), 0];
    var tipos;

    if(nomePokemon === ""){
        console.log(fifoFiltroTipo)
        if(fifoFiltroTipo[1]!=null){// Verifica se tem filtros de Tipo de Pokemon
            filtragem= true;
            const url_Tipos = `https://pokeapi.co/api/v2/type/${fifoFiltroTipo[1]}/`;
            const dadoTipos = await fetch(url_Tipos);
            tipos = await dadoTipos.json();
        }


        if(tipos?.results || tipos?.pokemon){// Verifica se foi criado
            for (const pokemonResults of tipos.results??tipos.pokemon) {
                mostrar[2]++;
                console.log(`(${mostrar[0] >= mostrar[2]} && ${mostrar[2] >= mostrar[1]})`)
                if(mostrar[0] >= mostrar[2]){console.log("skip");continue;}
                if(mostrar[2] > mostrar[1]){break;}
                var info = await infoPokemons(pokemonResults.name??pokemonResults.pokemon.name);
                
                // Se tiver um segundo Tipo ativo ele verifica se o pokemon 
                // se encaixa e permite a criação do conteiner
                if(fifoFiltroTipo[0]!=null){
                
                    // verifica em qual posicao esta o Tipo principal
                    if(info.tipagem.tipo1 == tipos.name){ // 1°
                        // verifica se o 2° Tipo é igual a um dos filtro
                        if(!(info.tipagem.tipo2 == fifoFiltroTipo[0] ||
                             info.tipagem.tipo2 == fifoFiltroTipo[1] ))
                            {continue;}

                    }
                    if(info.tipagem.tipo2 == tipos.name){// 2°
                        // verifica se a 1° Tipo é igual a um dos filtro
                        if(!(info.tipagem.tipo1 == fifoFiltroTipo[0] ||
                             info.tipagem.tipo1 == fifoFiltroTipo[1] ))
                            {continue;}

                    }
                }
                console.log(info.nome)
                document.getElementById("Caixa_Pokemon").innerHTML += criarContainer(info);
                console.log(mostrar)
            }// Fin for()
        }else{
            for(let i=24*pagina+1; i<=24*(pagina+1);i++){
                document.getElementById("Caixa_Pokemon").innerHTML += criarContainer(await infoPokemons(i));
            }
        }
    }
    else {
        //colocado o try catch para caso o pokemon não seja encontrado, apareça uma mensagem de erro na pesquisa.
        console.log("Pokemon em pesquisa");

        try {

            const info = await infoPokemons(nomePokemon);

            document.getElementById("Caixa_Pokemon").innerHTML +=
                criarContainer(info);

        } catch (erro) {

            console.error(erro);

            if (erro.message === "POKEMON_NAO_ENCONTRADO") {

                document.getElementById("Caixa_Pokemon").innerHTML = `
                    <div class="mensagemErro">
                        <h2>Pokémon não encontrado</h2>
                        <p>Verifique o nome ou número informado e tente novamente.</p>
                    </div>
                `;

            } else {

                document.getElementById("Caixa_Pokemon").innerHTML = `
                    <div class="mensagemErro">
                        <h2>Erro ao consultar a Pokédex</h2>
                        <p>Tente novamente em alguns instantes.</p>
                    </div>
                `;
            }
        }
    }
    
}

function criarContainer(info){//console.log("Container Criado para "+info.nome)
    return `
        <div class="container" style="background: linear-gradient(145deg, ${cores(info.tipagem.tipo1)}47%, rgba(0, 0, 0, 1)47%,rgba(0, 0, 0, 1)53%,   ${cores(info.tipagem.tipo2?info.tipagem.tipo2:info.tipagem.tipo1, .65)}53%)">
        <button class="pokeballInner" onclick="popUpInfo('${info.nome}')">
                <img src="${info.imagem.normal}" alt="${info.nome}" style="width:120px;height:120px;">
                
            </button>
            <p>${info.nome}</p>
        </div>
    `;
}
