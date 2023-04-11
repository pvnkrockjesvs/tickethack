document.querySelector("#buttonSearch").addEventListener('click', function(){
    // envoie le resultat de la recherche dans boite result
    let result = ''
    let data = true
    if(data) {
        result = `
        `
    } else {
        result = `
        <p id="ligneverte"><img src="images/notfound.png" alt="Search" height="200"></p>
        <p>No Trip found</p>`
    }
    return document.querySelector("#resultSearch").innerHTML = result
})


/*
Result Booking

            <p>My bookings</p>
            <div id="listBooking"></div>
            <p class="colorvert">Enjoy your trajets with Tickethack!</p>
*/
