    
/* *********** AFFICHER PANIER ************** */

fetch('http://localhost:3000/tickets/cart')
.then(response => response.json())
.then(
    data => {
        let listeData = data
        /*********** A SUPP  ***************/
       /* listeData = { tick: [{
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
        /************** */
        const panierVide =  `
        <p>No tickets in your cart.</p>
        <p>Why not plain a trip?</p>`
        if(listeData.result) {
            let listeAffiche = listeData.tick
            if(listeData.tick.length > 0)  {
                for(let i = 0; i < listeData.tick.length; i++) {
                    listeAffiche += `
                    <div class="listeSearch">
                    <div id="listeDepArriv">${listeData[i].departure} &rsaquo; ${listeData[i].arrival}</div>
                    <div id="listeHeure">${heure}:${minutes}</div>
                    <div id="listePrice"><strong>${listeData[i].price}€</strong></div>
                    <div id="listeChoix">
                    <button class="buttonGreen bookSearch" data-index="${i}">X</button>
                    <input type="hidden" value="${listeData[i]._id}">
                    </div>
                    </div>`
                }
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

