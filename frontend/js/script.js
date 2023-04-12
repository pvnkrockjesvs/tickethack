function notFound() {
    return `
    <p id="ligneverte"><img src="images/notfound.png" alt="Search" height="200"></p>
    <p>No Trip found</p>`
}
/* ******** RECHERCHE *********/

document.querySelector("#buttonSearch").addEventListener('click', function(){
    // envoie le resultat de la recherche dans boite result
    const departure = document.querySelector("#departure").value
    const arrival = document.querySelector("#arrival").value
    const date = document.querySelector("#date").value
    if(departure != "" && arrival != "" && date != "") {
        const NvlDateEn = new Date(date)
        let newMonth = dateAvantDix(NvlDateEn.getMonth()+1)
        let newDay = dateAvantDix(NvlDateEn.getDate())
        const dateEn = NvlDateEn.getFullYear()+'-'+newMonth+'-'+newDay
        
        if(NvlDateEn > new Date()) { // ne prends pas les trajets précédents (jour et heure > aujourd'hui)
            fetch('http://localhost:3000/trips/'+departure+"&"+arrival+"&"+dateEn)
            .then(response => response.json())
            .then(
                data => {
                    let result = '' 
                    
                    if(data && data.length >0) {
                        result += `<div id="blockSearch">`
                        for(let i = 0; i < data.length; i++) {
                            let newDate = new Date(data[i].date)
                            let heure = dateAvantDix(newDate.getHours())
                            let minutes = dateAvantDix(newDate.getMinutes())
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
                        result+=`</div>`
                    } else {
                        result = notFound()
                    }
                    document.querySelector("#resultSearch").innerHTML = `${result}`
                    bookSearch()
                }
                )
                
        } else {
            document.querySelector("#resultSearch").innerHTML = notFound()
        }
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
 