'use strict';

function normalizarPagina(valor) {
    let numeroPagina = Number.parseInt(valor, 10);

    if (Number.isNaN(numeroPagina)) {
        numeroPagina = 0;
    }

    const ultimaPagina = Math.floor(
        (TOTAL_POKEMONS - 1) / POKEMONS_POR_PAGINA
    );

    if (numeroPagina < 0) {
        return 0;
    }

    if (numeroPagina > ultimaPagina) {
        return ultimaPagina;
    }

    return numeroPagina;
}


function atualizarPagina(novaPagina) {
    pagina = normalizarPagina(novaPagina);

    document.getElementById("pageN").value = pagina;

    buscaApi();
}


function retroceder() {
    const ultimaPagina = Math.floor(
        (TOTAL_POKEMONS - 1) / POKEMONS_POR_PAGINA
    );

    if (pagina > 0) {
        atualizarPagina(pagina - 1);
    } else {
        atualizarPagina(ultimaPagina);
    }
}


function paginaIdentifier() {
    const seletor = document.getElementById("pageN").value;

    atualizarPagina(seletor);
}


function avancar() {
    const ultimaPagina = Math.floor(
        (TOTAL_POKEMONS - 1) / POKEMONS_POR_PAGINA
    );

    if (pagina >= ultimaPagina) {
        atualizarPagina(0);
    } else {
        atualizarPagina(pagina + 1);
    }
}