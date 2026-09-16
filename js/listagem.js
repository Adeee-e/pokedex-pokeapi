'use strict';

const buscaApi = async () => {

    const caixaPokemon = document.getElementById("Caixa_Pokemon");

    caixaPokemon.innerHTML = "";

    const nomePokemon = document.getElementById("Pesquisa").value.trim().toLowerCase();

    // PESQUISA POR NOME OU NÚMERO
    if (nomePokemon !== "") {

        try {

            const info = await infoPokemons(nomePokemon);

            caixaPokemon.innerHTML = criarContainer(info);

        } catch (erro) {

            console.error(erro);

            if (erro.message === "POKEMON_NAO_ENCONTRADO") {

                caixaPokemon.innerHTML = `
                    <div class="mensagemErro">
                        <h2>Pokémon não encontrado</h2>
                        <p>
                            Verifique o nome ou número informado
                            e tente novamente.
                        </p>
                    </div>
                `;

            } else {

                caixaPokemon.innerHTML = `
                    <div class="mensagemErro">
                        <h2>Erro ao consultar a Pokédex</h2>
                        <p>
                            Tente novamente em alguns instantes.
                        </p>
                    </div>
                `;
            }
        }

        return;
    }

    // LISTAGEM / FILTROS
    try {

        const filtrosAtivos = fifoFiltroTipo.filter(tipo => tipo !== null);

        // SEM FILTRO
        if (filtrosAtivos.length === 0) {

            const primeiroPokemon = pagina * POKEMONS_POR_PAGINA + 1;

            const ultimoPokemon = Math.min((pagina + 1) * POKEMONS_POR_PAGINA,TOTAL_POKEMONS);

            const requisicoes = [];

            for (let id = primeiroPokemon; id <= ultimoPokemon; id++) {
               
                requisicoes.push(infoPokemons(id));
            }

            const pokemons = await Promise.all(requisicoes);

            caixaPokemon.innerHTML = pokemons.map(info => criarContainer(info)).join("");

            return;
        }

        // COM FILTRO
        const listasPorTipo = await Promise.all(filtrosAtivos.map(tipo => nomesPokemonsPorTipo(tipo)));

        let nomesFiltrados = listasPorTipo[0];

        // Se houver dois filtros,
        // fazemos a interseção dos dois conjuntos.
        if (listasPorTipo.length === 2) {

            const segundoTipo = new Set(listasPorTipo[1]);
            nomesFiltrados = nomesFiltrados.filter(nome => segundoTipo.has(nome));
        }

        // PAGINAÇÃO DEPOIS DA FILTRAGEM
        const ultimaPaginaFiltro = Math.max(0, Math.ceil(nomesFiltrados.length / POKEMONS_POR_PAGINA) - 1);


        // Caso o usuário tenha digitado uma página
        // maior que a quantidade disponível no filtro.
        if (pagina > ultimaPaginaFiltro) {

            pagina = ultimaPaginaFiltro;

            document.getElementById("pageN").value = pagina;
        }


        const inicio = pagina * POKEMONS_POR_PAGINA;

        const fim = inicio + POKEMONS_POR_PAGINA;


        const nomesDaPagina = nomesFiltrados.slice(inicio, fim);


        if (nomesDaPagina.length === 0) {

            caixaPokemon.innerHTML = `
                <div class="mensagemErro">
                    <h2>Nenhum Pokémon encontrado</h2>
                    <p>
                        Não existem Pokémon com os tipos selecionados.
                    </p>
                </div>
            `;
            return;
        }

        const pokemons = await Promise.all(

            nomesDaPagina.map(nome => infoPokemons(nome))

        );

        caixaPokemon.innerHTML = pokemons.map(info => criarContainer(info)).join("");

    } catch (erro) {

        console.error(erro);

        caixaPokemon.innerHTML = `
            <div class="mensagemErro">
                <h2>Erro ao carregar os Pokémon</h2>
                <p>
                    Tente novamente em alguns instantes.
                </p>
            </div>
        `;
    }
};

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
