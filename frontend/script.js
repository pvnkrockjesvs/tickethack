/* ******** RECHERCHE *********/

document.querySelector("#buttonSearch").addEventListener('click', function(){
    // envoie le resultat de la recherche dans boite result
    const departure = document.querySelector("#departure").value
    const arrival = document.querySelector("#arrival").value
    const date = document.querySelector("#date").value
    if(departure != "" && arrival != "" && date != "") {

        const NvlDateEn = new Date(date)
        let newMonth = NvlDateEn.getMonth()+1
        let newDay = NvlDateEn.getDate()
        if(newMonth < 10) { newMonth = "0"+newMonth } 
        if(newDay < 10) { newDay = "0"+newDay } 
        const dateEn = NvlDateEn.getFullYear()+'-'+newMonth+'-'+newDay
        fetch('http://localhost:3000/trips/'+departure+"&"+arrival+"&"+dateEn)
        .then(response => response.json())
        .then(
            data => {
                let result = '' 
                /*********** A SUPP  ***************/
                data = [{
                    "_id": "64351c6787c4d8dbf2e85299",
                    "departure": "Paris",
                    "arrival": "Marseille",
                    "date": "2023-04-15T06:28:33.263Z",
                    "price": 113
                },{
                    "_id": "64351c6787c4d8dbf2e85292",
                    "departure": "Paris",
                    "arrival": "Marseille",
                    "date": "2023-04-15T06:50:33.263Z",
                    "price": 90
                },{
                    "_id": "64351c6787c4d8dbf2e85292",
                    "departure": "Paris",
                    "arrival": "Marseille",
                    "date": "2023-04-15T09:30:33.263Z",
                    "price": 90
                } ] 
                /*********** */
                if(data) {
                    for(let i = 0; i<data.length; i++) {
                        let newDate = new Date(data[i].date)
                        let heure = newDate.getHours()
                        let minutes = newDate.getMinutes()
                        result += `
                        <div class="listeSearch">
                            <div id="listeDepArriv">${data[i].departure} &rsaquo; ${data[i].arrival}</div>
                            <div id="listeHeure">${heure}:${minutes}</div>
                            <div id="listePrice"><strong>${data[i].price}€</strong></div>
                            <div id="listeChoix">
                                <button class="buttonGreen bookSearch" data-index="${i}">Book</button>
                                <input type="hidden" value="${data[i]._id}">
                            </div>
                        </div>`
                    }
                } else {
                    result = `
                    <p id="ligneverte"><img src="images/notfound.png" alt="Search" height="200"></p>
                    <p>No Trip found</p>`
                }
                document.querySelector("#resultSearch").innerHTML = `<div id="blockSearch">${result}</div>`
                bookSearch()
            }
        )
    } // fin if
    else {
        console.log("Rien de rempli")
    }
})

/* ******* AJOUT AU PANIER ****** */

function bookSearch() {
    const tousLesBoutons = document.querySelectorAll('[data-index]')
    for (let i = 0; i < tousLesBoutons.length; i++) {
        // quand clic sur un bouton 
        // récup les champs 
        tousLesBoutons[i].addEventListener('click',
            function () {
                const idBook = this.nextElementSibling.value
                //POST trips/tickets/id
                fetch('http://localhost:3000/tickets/'+idBook, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // body: JSON.stringify(idBook)
                })
                .then(response => response.json())
                .then(
                    data => {
                        if(data) {
                            // redirect vers panier
                            window.location.assign("cart.html")
                        } else {}
                    }
                )
            }
        );
    }
}
      
    
/* *********** AFFICHER PANIER ************** */

fetch('http://localhost:3000/tickets/cart')
.then(response => response.json())
.then(
    data => {
        console.log("Boo")
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
        if(listeData.result) {
            let listeAffiche=''
            for(let i = 0; i<listeData.length; i++) {
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
            document.querySelector("#resultCart").innerHTML = `
            <p>No tickets in your cart.</p>
            <p>Why not plain a trip?</p>`
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

