const eventHub = document.querySelector(".container")

export const buttonMaker = () => {
    const buttonHolder = document.querySelector(".facility__button")
    buttonHolder.innerHTML = `<button type="button" id="facilityButton">Facilities</button>`

}

eventHub.addEventListener("click", e => {
    if (e.target.id === "facilityButton") {
        const facilitiesButtonClicked = new CustomEvent("facilitiesButtonClicked")
        eventHub.dispatchEvent(facilitiesButtonClicked)
    }
})

