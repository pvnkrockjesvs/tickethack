    
/* *********** AFFICHER PANIER ************** */

fetch('http://localhost:3000/tickets/cart')
.then(response => response.json())
.then(
    data => {
        let listeData = data
        /*********** A SUPP  ***************/ /*
        listeData = { tick: [{
                "_id": "64351c6787c4d8dbf2e85299",
                "departure": "Paris",
                "arrival": "Marseille",
                "date": "2023-04-15T06:28:33.263Z",
                "price": 200
            },{
                "_id": "64351c6787c4d8dbf2e85292",
                "departure": "Paris",
                "arrival": "Marseille",
                "date": "2023-04-15T06:50:33.263Z",
                "price": 100
            },{
                "_id": "64351c6787c4d8dbf2e85292",
                "departure": "Paris",
                "arrival": "Marseille",
                "date": "2023-04-15T09:30:33.263Z",
                "price": 50
            } ],
            result: true, total: 350
        } */
        console.log(listeData)
        /************** */
        const panierVide =  `
        <p>No tickets in your cart.</p>
        <p>Why not plain a trip?</p>`
        if(listeData.result) {
            let listeTick = listeData.tick
            let listeAffiche = "<p>My cart</p>"
            //console.log(listeTick)
            if(listeTick.length > 0)  {
                for(let i = 0; i < listeTick.length; i++) {
                    let newDate = new Date(listeTick[i].trip[0].date)
                    let heure = newDate.getHours()
                    let minutes = newDate.getMinutes()
                    listeAffiche += `
                    <div class="listeSearch">
                        <div id="listeDepArriv">${listeTick[i].trip[0].departure} &rsaquo; ${listeTick[i].trip[0].arrival}</div>
                        <div id="listeHeure">${heure}:${minutes}</div>
                        <div id="listePrice"><strong>${listeTick[i].trip[0].price}€</strong></div>
                        <div id="listeChoix">
                        <button class="buttonGreen cartDelete" data-index="${i}">X</button>
                        <input type="hidden" value="${listeTick[i].trip[0]._id}">
                        </div>
                    </div>`
                }
                listeAffiche += `<div id="totalCart"><div>Total: ${listeData.total}€</div>
                <div><button id="purchase" class="buttonGreen">Purchase</button></div></div>`
                document.querySelector("#resultCart").innerHTML = listeAffiche
            } else {
                document.querySelector("#resultCart").innerHTML = panierVide
            }
        } else {
            document.querySelector("#resultCart").innerHTML = panierVide
        }
    }
)

/* ******* SUPP Panier ****** */

const tousLesBoutons = document.querySelectorAll('.cartDelete')
for (let i = 0; i < tousLesBoutons.length; i++) {
    // quand clic sur un bouton 
    // récup les champs 
    tousLesBoutons[i].addEventListener('click',
        function () {
            console.log("kkk")
            const idCart = this.nextElementSibling.value
            console.log(idCart)
            fetch('http://localhost:3000/tickets/cart/'+idCart, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify(idBook)
            })
            .then(response => response.json())
            .then(
                data => {
                    if(data) {
                        // delete affichage
                        this.paentNode.style.display = none
                    } else {}
                }
            )
    })
}

/* ******* Valide Panier ****** */

// redirect vers Bookings
//window.location.assign("bookings.html")