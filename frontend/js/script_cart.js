function msgPanierVide() {
    return  `
    <p>No tickets in your cart.</p>
    <p>Why not plain a trip?</p>`
}

/* *********** AFFICHER PANIER ************** */

function affichePanier() {
    fetch('http://localhost:3000/tickets/cart')
    .then(response => response.json())
    .then(
        data => { // OK
            let panierVide = msgPanierVide()
            let listeData = data
            if(listeData.result) {
                let listeTick = listeData.tick
                let listeAffiche = "<p>My cart</p>"
                console.log(listeTick)
                if(listeTick.length > 0)  {
                    for(let i = 0; i < listeTick.length; i++) {
                        let newDate = new Date(listeTick[i].trip[0].date)
                        let heure = dateAvantDix(newDate.getHours())
                        let minutes = dateAvantDix(newDate.getMinutes())
                        
                        listeAffiche += `
                        <div class="listeSearch">
                            <div id="listeDepArriv">${listeTick[i].trip[0].departure} &rsaquo; ${listeTick[i].trip[0].arrival}</div>
                            <div id="listeHeure">${heure}:${minutes}</div>
                            <div id="listePrice"><strong>${listeTick[i].trip[0].price}€</strong></div>
                            <div id="listeChoix">
                                <button class="buttonGreen cartDelete" data-index="${i}">X</button>
                                <input type="hidden" id="id${i}" value="${listeTick[i]._id}">
                            </div>
                        </div>`
                    }
                    listeAffiche += `<div id="totalCart"><div>Total: ${listeData.total}€</div>
                    <div><button id="purchase" class="buttonGreen">Purchase</button></div></div>`
                    document.querySelector("#resultCart").innerHTML = listeAffiche
                    purchasePanier()
                    deletePanier()
                } else {
                    document.querySelector("#resultCart").innerHTML = panierVide
                }
            } else {
                document.querySelector("#resultCart").innerHTML = panierVide
            }
        }
    )

}
affichePanier()

/* ******* SUPP Panier ****** */
function deletePanier() {

    const tousLesBoutons = document.querySelectorAll('.cartDelete')
    for (let i = 0; i < tousLesBoutons.length; i++) {
        // quand clic sur un bouton 
        // récup les champs 
        tousLesBoutons[i].addEventListener('click',
            function () {
                
                const idCart = this.nextElementSibling.value
                console.log(idCart)
                fetch('http://localhost:3000/tickets/cart/'+idCart, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    //body: JSON.stringify(idCart)
                })
                .then(response => response.json())
                .then(
                    data => { /*
                        if(data) {
                            // delete affichage
                            this.parentNode.parentNode.style.display = "none"
                            console.log(data)
                        } else {
                            console.log("Delete impossible")
                        } */
                        // reaffiche panier pour gérer si vide
                        affichePanier()
                    }
                )
        })
    }
}

function purchasePanier() { // OK
    /* ******* Valide Panier ****** */
    document.querySelector('#purchase').addEventListener('click', function() {
        const tousLesTrips = document.querySelectorAll('.listeSearch')
        // console.log("Purchase : "+tousLesTrips.length)
        for(let i =0; i < tousLesTrips.length; i++) {
            let idCart = document.querySelector('id'+i)
            // console.log(idCart)
            // change le statut en acheté isPayed
            fetch('http://localhost:3000/tickets/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json())
            .then(
                data => { 
                    console.log(data.tick)
                    window.location.assign("bookings.html")
                  }
            )
        }
    })
}