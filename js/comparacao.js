'use strict';

function limparComparacao(){
    pokemonsComparar[0] =null;
    pokemonsComparar[1] =null;
    document.getElementById("CompararIcon").style.display="none";
}

async function comparar(){
    if(pokemonsComparar[1] == null){
        pokemonsComparar.splice(1,1,document.getElementById("pokemonNamePopUp").innerHTML);
        //pokemonsComparar= [NULL, 'POKEMON1']

        document.getElementById("CompararIcon").style.display="grid";
        document.getElementById("PopUpInfo").style.display = "none";
        document.getElementById("CompararIcon").innerHTML=`<img src="${document.getElementById("imagemPopUp").children[0].src}" alt="Comparar Pokemons" style="width: 40px;height: 45px;margin: 2px 0px 0px 5px;"></img>`
    }
    else{
        pokemonsComparar.splice(0,1,document.getElementById("pokemonNamePopUp").innerHTML);
        //pokemonsComparar= ['POKEMON2', 'POKEMON1']
        console.log(pokemonsComparar)

        document.getElementById("ShowComparacao").style.display="inline-flex";
        document.getElementById("ShowInfo").style.display="none";
        document.getElementById("CompararPokemon1").style.display="grid";
        document.getElementById("CompararPokemon2").style.display="grid";
        


//////////////////////////////////////////////////////////////////////////////////////////////////




    for(let indexX=0;indexX<2;indexX++){
        console.log("arrancando info de: "+ pokemonsComparar[1-indexX])
        /*
        if(document.getElementById("ID_ListaDeMegas").classList[1] == "mostrar"){
        document.getElementById("ID_ListaDeMegas").classList.toggle("mostrar");
        }
        
        //define o display para mostrar
        document.getElementById("PopUpInfo").style.display = "inline-block";
        document.getElementById("ShowInfo").style.display="grid";
        */
        //pega as informações do pokemon
        let info = await infoPokemons(pokemonsComparar[1-indexX]);

        //seu numero na pokedex
        document.getElementById(`pokeEntryComparar${indexX+1}`).innerHTML=info.entrada;
        //sua imagem
        document.getElementById(`imagemComparar${indexX+1}`).children[0].src= info.imagem.normal;
        //seu nome
        document.getElementById(`pokemonNameComparar${indexX+1}`).innerHTML= info.nome;

        /*
        //suas variantes de mega evoluções
        if(info.alternativo["mega-x"] || info.alternativo["mega-y"] || info.alternativo["mega-z"] || info.alternativo["mega"]){
            document.getElementById("ID_ListaDeMegas").innerHTML="";
            document.getElementById("variantes_mega").style.display="unset"
            for(let variantes in info.alternativo){
                if(variantes == "gigantamax" || info.alternativo[variantes] == null){continue}
                
                document.getElementById("ID_ListaDeMegas").innerHTML+=`
                <a style="font-size:12px;" onclick="popUpInfo('${info.nome.replace(/(?:-)mega(?:-[xyz])?/i, "").replace("-gmax", "")}-${variantes}')">
                    <img src="${info.alternativo[variantes]}" alt="${variantes}" style="height:40px;width:40px;margin-right:-5px;margin-left:-5px;">
                    Mega ${info.nome.replace(/(?:-)mega(?:-[xyz])?/i, "")} ${variantes.replace("mega-x", "X").replace("mega-y", "Y").replace("mega-z", "Z")}
                </a>
                `
            }
        }else{document.getElementById("variantes_mega").style.display="none"}
        
        //esconde o botão de Dynamax    
        document.getElementById("ID_Dynamax").style.display="none";
        document.getElementById("ID_Dynamax").classList["collored"];

        //cria o link para redirecionar a foto da Dynamax
        document.getElementById("ID_Dynamax").innerHTML=`
            <button onclick="popUpInfo('${info.nome.replace(/(?:-)mega(?:-[xyz])?/i, "").replace("-gmax", "")}${info.nome.includes("-gmax")?"":"-gmax"}')" class="botaoAdicional" id="ID_Dynamax_Botao">
                <img src="images/giganta_max-removebg.png"  alt="Mega Evo" style="height: 100%;width:162%;border-radius: 100%; margin-left:-5px;">
            </button>`;

        
        if(info.alternativo["gigantamax"]){
            //mostra o icone de Dynamax
            document.getElementById("ID_Dynamax").style.display="unset";    
            if(info.nome.includes("-gmax")){
                //se não tiver na forma Dynamax remove a cor do icone
                document.getElementById("ID_Dynamax").classList.add("collored");
            }
        }
        
        //se não tiver na forma Dynamax remove a cor do icone
        if(!info.nome.includes("-gmax")){
            document.getElementById("ID_Dynamax").classList.remove("collored");
        }
        */

        //Limpa o icone de tipos
        document.getElementById(`typesComparar${indexX+1}`).innerHTML="";

        //adiciona os tipos correspondentes a este pokemon
        document.getElementById(`typesComparar${indexX+1}`).innerHTML+=`
                        <div class="filtro_Elemento_PopUp" id="filtro_${info.tipagem.tipo1}_Comparar${indexX+1}" style="background-color:${cores(info.tipagem.tipo1)}">
                            ${info.tipagem.tipo1}
                        </div>
                    `;
        if(info.tipagem.tipo1 != info.tipagem.tipo2 && info.tipagem.tipo2 !==null){
                document.getElementById(`typesComparar${indexX+1}`).innerHTML+=`
                        <div class="filtro_Elemento_PopUp" id="filtro_${info.tipagem.tipo2}_Comparar${indexX+1}" style="background-color:${cores(info.tipagem.tipo2)}">
                            ${info.tipagem.tipo2}
                        </div>
                    `;
        }

        //caso remove a div que tiver o ID abaixo, pois o pokemon tem apenas um elemento
        document.getElementById(`filtro_undefined_Comparar${indexX+1}`)?.remove();

        //cria a barra de status dos pokemons
        document.getElementById(`statusComparar${indexX+1}`).innerHTML=`
                        <div id="hp">Hp: ${info.status["hp"]}
                            <div id="hp2" style="background: linear-gradient(90deg, rgba(175,175,175,1) ${(info.status["hp"]/255)*100}%, rgba(45,45,45,1) ${(info.status["hp"]/255)*100}%); border:3px solid rgb(45,45,45); border-radius:15px; height:10px">
                            </div>
                        </div>
                        <div id="attack">Atk: ${info.status["attack"]}
                            <div id="attack2" style="background: linear-gradient(90deg, rgba(175,175,175,1) ${(info.status["attack"]/255)*100}%, rgba(45,45,45,1) ${(info.status["attack"]/255)*100}%); border:3px solid rgb(45,45,45); border-radius:15px; height:10px">
                            </div>
                        </div>
                        <div id="defense">Defense: ${info.status["defense"]}
                            <div id="defense2" style="background: linear-gradient(90deg, rgba(175,175,175,1) ${(info.status["defense"]/255)*100}%, rgba(45,45,45,1)  ${(info.status["defense"]/255)*100}%); border:3px solid rgb(45,45,45); border-radius:15px; height:10px">
                            </div>
                        </div>
                        <div id="sp_attack">Sp Atk: ${info.status["special_attack"]}
                            <div id="sp_attack2" style="background: linear-gradient(90deg, rgba(175,175,175,1) ${(info.status["special_attack"]/255)*100}%, rgba(45,45,45,1) ${(info.status["special_attack"]/255)*100}%); border:3px solid rgb(45,45,45); border-radius:15px; height:10px">
                            </div>    
                        </div>
                        <div id="sp_defense">Sp Defense: ${info.status["special_defense"]}
                            <div id="sp_defense2" style="background: linear-gradient(90deg, rgba(175,175,175,1) ${(info.status["special_defense"]/255)*100}%, rgba(45,45,45,1)${(info.status["special_defense"]/255)*100}%); border:3px solid rgb(45,45,45); border-radius:15px; height:10px">
                            </div>
                        </div>
                        <div id="speed">Speed: ${info.status["speed"]}
                            <div id="speed2" style="background: linear-gradient(90deg, rgba(175,175,175,1) ${(info.status["speed"]/255)*100}%, rgba(45,45,45,1) ${(info.status["speed"]/255)*100}%); border:3px solid rgb(45,45,45); border-radius:15px; height:10px">
                            </div>
                        </div>
                    `;

        }
    }
    

}
