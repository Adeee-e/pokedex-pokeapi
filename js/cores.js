
function cores(x, alphaValue=1){
    let coresPorElemento = {
        'grass'    : `rgba(119, 204,  85, ${alphaValue})`,
        'poison'   : `rgba(170,  85, 153, ${alphaValue})`,
        'fire'     : `rgba(255,  68,  34, ${alphaValue})`,
        'flying'   : `rgba(136, 153, 255, ${alphaValue})`,
        'water'    : `rgba( 51, 153, 255, ${alphaValue})`,
        'bug'      : `rgba(170, 187,  34, ${alphaValue})`,
        'normal'   : `rgba(170, 170, 153, ${alphaValue})`,
        'electric' : `rgba(255, 204,  51, ${alphaValue})`,
        'ground'   : `rgba(221, 187,  85, ${alphaValue})`,
        'fighting' : `rgba(185,  84,  67, ${alphaValue})`,
        'psychic'  : `rgba(255,  85, 153, ${alphaValue})`,
        'rock'     : `rgba(187, 170, 102, ${alphaValue})`,
        'ice'      : `rgba(102, 204, 255, ${alphaValue})`,
        'ghost'    : `rgba(102, 102, 187, ${alphaValue})`,
        'dragon'   : `rgba(119, 102, 238, ${alphaValue})`,
        'fairy'    : `rgba(238, 153, 238, ${alphaValue})`,
        'steel'    : `rgba(170, 170, 187, ${alphaValue})`,
        'dark'     : `rgba(119,  85,  68, ${alphaValue})`,
        'off'      : `rgba(  35,   35,   35, 0.75)`
    };
    
    return coresPorElemento[x];
}
