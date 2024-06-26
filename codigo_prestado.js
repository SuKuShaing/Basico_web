//---------------------Al recuperar enemigos--------------------------
mokeponesEnemigos = enemigos.map(function (enemigo)
{
    let mokeponEnmigo = null
    if(enemigo.mokepon != undefined)
    {
        const mokeponNombre = enemigo.mokepon.nombre 
        switch (mokeponNombre)
        {
        case "Hipodoge":
            mokeponEnmigo = newMokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id)
                break
            case "Capipepo":
                mokeponEnmigo = newMokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id)
                break
            case "Ratigueya":
                mokeponEnmigo = newMokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id)
                break
            default:
                break
        }

        mokeponEnmigo.x = enemigo.x
        mokeponEnmigo.y = enemigo.y
    }
        return mokeponEnmigo
})

//---------------------------------Al tratar de pintar enemigos----------------------------------------
mokeponesEnemigos.forEach(function (mokepon)
{
if(mokepon != undefined){
mokepon.pintarMokepon()
revisarColision(mokepon)
}
})