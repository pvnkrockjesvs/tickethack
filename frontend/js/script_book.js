fetch('http://localhost:3000/tickets/booked').then(response => response.json()).then(books => {
if (books.result === false) {
        document.querySelector('#resultBooking').innerHTML += `            
        <p>No booking yet.</p>
        <p>Why not plain a trip?</p>`
} 
else {    
        
        let listeAffiche = "<p>My bookings</p>"
        for (let i in books.booked) {
            let ticket = books.booked[i].trip[0]
            let date = new Date(ticket.date)
            let diff = moment.duration(date - moment()).humanize()

            listeAffiche += `
            <div class="listeSearch">
                <div id="listeDepArriv">${ticket.departure} &rsaquo; ${ticket.arrival}</div>
                <div id="listeHeure">${dateAvantDix(date.getHours())}h${dateAvantDix(date.getMinutes())}</div>
                <div id="listePrice">${ticket.price}€</div>
                <div id="listeDep"><strong>Departure in ${diff}</strong></div>
            </div>
            `
        }
        listeAffiche += '<div id="lignenoire"></div><p class="colorvert">Enjoy your travels with Tickethack!</p>'
        document.querySelector('#resultBooking').innerHTML = listeAffiche
    }
})