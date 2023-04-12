fetch('http://localhost:3000/tickets/booked').then(response => response.json()).then(books => {
if (books.result == false) {
        document.querySelector('#resultBooking').innerHTML += `            
        <p>No booking yet.</p>
        <p>Why not plain a trip?</p>`
    } else {    

        for (let i in books.booked) {
            let ticket = books.booked[i].trip[0]
            let date = new Date(ticket.date)
            let diff = moment.duration(date - moment()).humanize()



            document.querySelector('#resultBooking').innerHTML += `
            <div class="listeSearch">
            <div id="listeDepArriv">${ticket.departure} &rsaquo; ${ticket.arrival}</div>
            <div id="listeHeure">${date.getHours()}h${date.getMinutes()}</div>
            <div id="listePrice">${ticket.price}€</div>
            <div id="listeDep"><strong>Departure in ${diff}</strong></div>
        </div>
            `
        }
    }
})