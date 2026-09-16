'use strict';

async function infoPokemons(Pokemon){
    const url_Poke = `http://pokeapi.co/api/v2/pokemon/${Pokemon}`;
    const dados1 = await fetch(url_Poke);
    var Pokemon = await dados1.json();
    
    
    const dados2 = await fetch(Pokemon.species.url);
    var specie = await dados2.json();
    var descricao;

    for(let traducao of specie.flavor_text_entries){
        if(traducao.language.name !== "en"){continue}
            descricao = traducao.flavor_text
                .replace(/[\f\n]/g, " ")
                .replace(/é/g, " ");
        
        if(traducao.language.name === "en"){break}; 
    }


    let variantes={"x":null,"y":null,"z":null, "mega":null, "gmax":null}
    
    for(let variante of specie.varieties){
        if(variante.is_default || variante.pokemon.name.includes("-totem")){continue}
        console.log(variante.pokemon.name)

        if(variante.pokemon.name.includes("-mega")){
            const url2 = `http://pokeapi.co/api/v2/pokemon-form/${variante.pokemon.name}`
            const dados3 = await fetch(url2);
            var poke_form = await dados3.json();

            const url3 = poke_form.trigger_conditions[0].url;
            const dados4 = await fetch(url3);
            var item = await dados4.json();
            
            if(variante.pokemon.name.includes("-mega-x")){
                variantes.x = item.sprites.default;
            }else
            if(variante.pokemon.name.includes("-mega-y")){
                variantes.y = item.sprites.default;
            }else
            if(variante.pokemon.name.includes("-mega-z")){
                item.sprites.default;
            }else{
                variantes.mega= item.sprites.default;
            }
        }
        
        if(variante.pokemon.name.includes("-gmax")){
            const url2 = `http://pokeapi.co/api/v2/item/1141`
            const dados3 = await fetch(url2);
            var poke_form = await dados3.json();

           
            
            variantes.gmax = "images/giganta_max-removebg.png";
        }
        
    }

    
    return {
            ["entrada"]:specie.order,
            ["nome"]: Pokemon.name,
            ["altura"]: Pokemon.height / 10,
            ["peso"]: Pokemon.weight / 10,
            ["habilidades"]: Pokemon.abilities.map(habilidade => habilidade.ability.name.replaceAll("-", " ")),
            ["regiao"]: Pokemon.encounters,
            ["geracao"]: Pokemon.game_indices[0]?.version["name"],
            ["descricao"]: descricao,
            ["imagem"]:{"normal" : Pokemon.sprites.other["official-artwork"]["front_default"],
                        "shiny"  : Pokemon.sprites.other["official-artwork"]["front_shiny"]
                       },
            ["tipagem"]:{"tipo1" : Pokemon.types[0].type['name'],
                         "tipo2" : Pokemon.types[1]?.type['name']
                        },
            ["alternativo"]:{"mega":variantes.mega??null, "mega-x": variantes.x??null, "mega-y": variantes.y??null, "mega-z":variantes.z??null, "gigantamax":variantes.gmax??null},                        
            ["status"]:{[`${Pokemon.stats[0].stat.name.replace("-", "_")}`] : Pokemon.stats[0].base_stat,
                        [`${Pokemon.stats[1].stat.name.replace("-", "_")}`] : Pokemon.stats[1].base_stat,
                        [`${Pokemon.stats[2].stat.name.replace("-", "_")}`] : Pokemon.stats[2].base_stat,
                        [`${Pokemon.stats[3].stat.name.replace("-", "_")}`] : Pokemon.stats[3].base_stat,
                        [`${Pokemon.stats[4].stat.name.replace("-", "_")}`] : Pokemon.stats[4].base_stat,
                        [`${Pokemon.stats[5].stat.name.replace("-", "_")}`] : Pokemon.stats[5].base_stat,
                       },
        };
};
