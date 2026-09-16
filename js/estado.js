'use strict';

const TOTAL_POKEMONS = 1025;
const POKEMONS_POR_PAGINA = 24;

let pagina=document.getElementById("pageN").valueAsNumber;

const pokemonsComparar=[null,null]

const fifoFiltroTipo=[null,null]
const filtroTipo= {        
    'grass'    : true,
    'poison'   : true,
    'fire'     : true,
    'flying'   : true,
    'water'    : true,
    'bug'      : true,
    'normal'   : true,
    'electric' : true,
    'ground'   : true,
    'fighting' : true,
    'psychic'  : true,
    'rock'     : true,
    'ice'      : true,
    'ghost'    : true,
    'dragon'   : true,
    'fairy'    : true,
    'steel'    : true,
    'dark'     : true
}
