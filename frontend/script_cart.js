    
/* *********** AFFICHER PANIER ************** */

fetch('http://localhost:3000/tickets/cart')
.then(response => response.json())
.then(
    data => {
        let listeData = data
        /*********** A SUPP  ***************/
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
        } 
        /************** */
        const panierVide =  `
        <p>No tickets in your cart.</p>
        <p>Why not plain a trip?</p>`
        if(listeData.result) {
            let listeTick = listeData.tick
            let listeAffiche = "<p>My cart</p>"
            console.log(listeTick)
            if(listeTick.length > 0)  {
                for(let i = 0; i < listeTick.length; i++) {
                    let newDate = new Date(listeTick[i].date)
                    let heure = newDate.getHours()
                    let minutes = newDate.getMinutes()
                    listeAffiche += `
                    <div class="listeSearch">
                        <div id="listeDepArriv">${listeTick[i].departure} &rsaquo; ${listeTick[i].arrival}</div>
                        <div id="listeHeure">${heure}:${minutes}</div>
                        <div id="listePrice"><strong>${listeTick[i].price}€</strong></div>
                        <div id="listeChoix">
                        <button class="buttonGreen bookSearch" data-index="${i}">X</button>
                        <input type="hidden" value="${listeTick[i]._id}">
                        </div>
                    </div>`
                }
                listeAffiche += `<div id="totalCart"><div>Total: ${listeData.total}€</div>
                <div><button id="purchase" class="buttonGreen">Purchase</button></div></div>`
                document.querySelector("#resultCart").innerHTML = listeAffiche
            } else {
                document.querySelector("#resultCart").innerHTML = parnierVide
            }
        } else {
            document.querySelector("#resultCart").innerHTML = parnierVide
        }
    }
)

/* ******* BOOKING = billets ACHETES ****** */
/* if isPayed
Result Booking

            <p>My bookings</p>
            <div id="listBooking"></div>
            <p class="colorvert">Enjoy your trajets with Tickethack!</p>
*/


// supp du panier

