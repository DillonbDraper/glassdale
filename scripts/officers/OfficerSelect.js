import { getOfficers, useOfficers } from "./OfficerProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__officer")

eventHub.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "officerSelect") {
        
        const selectedOfficerID = parseInt(changeEvent.target.value)

        
        const customEvent = new CustomEvent("officerSelected", {
            detail: {
                officer: selectedOfficerID
            }
        })

        eventHub.dispatchEvent(customEvent)
    }
})

export const OfficerSelect = () => {
    getOfficers().then(
        () => {
            const officers = useOfficers()
            render(officers)
        }
    )
}

const render = officerCollection => {
    /*
        Use interpolation here to invoke the map() method on
        the convictionsCollection to generate the option elements.
        Look back at the example provided above.
    */
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            ${officerCollection.map(officer => {
                return `<option value="${officer.id}">${officer.name}</option>`
            }).join(" ")
        }
        </select>
    `
}