const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'kennyverse'
});


async function findAllPokemon(){
   const data = await db.any('SELECT * from pokemon2');
   console.log(data);
}

async function findPokemonByColor(color){
    const data = await db.any('SELECT * from pokemon2 where color=$1', color);
    console.log(data);
}
 
async function addPokemon(name, color){
    return await db.one('INSERT INTO pokemon2(p_name, color) VALUES ($1, $2) RETURNING id', [name, color])
}

async function deletePokemon(id){
    await db.any('DELETE FROM pokemon2 where id=$1', id);
    console.log('Deleted id ' + id);
}

(async ()=>{
    await findAllPokemon();
    //await findPokemonByColor('red');
    //await addPokemon('Scizor', 'red');
    //await deletePokemon(2);
})();