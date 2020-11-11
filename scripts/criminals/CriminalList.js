import { useConvictions } from '../convictions/ConvictionProvider.js'
import { useOfficers } from '../officers/OfficerProvider.js'
import { getCriminals, useCriminals } from './CriminalProvider.js'
import { Criminal } from "./Criminal.js"
import { getFacilities, useFacilities } from "../facility/FacilityProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "../facility/CriminalFacilityProvider.js"

const eventHub = document.querySelector(".container")

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener('crimeChosen', event => {
    // Use the property you added to the event detail.
    if (event.detail.crimeThatWasChosen !== "0") {
        /*
            Filter the criminals application state down to the people that committed the crime
        */
        const convictionsArray = useConvictions()
        const theCrime = convictionsArray.find(convictionObj => convictionObj.id === parseInt(event.detail.crimeThatWasChosen))

        const appStateCriminals = useCriminals()

        const matchingCriminals = appStateCriminals.filter(matchedCrime => matchedCrime.conviction === theCrime.name)

        /*
            Then invoke render() and pass the filtered collection as
            an argument
        */
        render(matchingCriminals)
    }
})

eventHub.addEventListener("click", event => {

    if (event.target.id.startsWith("associates")) {
        // Create custom event. Provide an appropriate name.
        const arrToSplit = event.target.id.split("--")
        const idNumber = parseInt(arrToSplit[1])
        const customEvent = new CustomEvent("alibisRequested", {
            detail: {
                id: idNumber
            }
        })
        // Dispatch to event hub
        eventHub.dispatchEvent(customEvent)
    }
})


eventHub.addEventListener('officerSelected', event => {
    // Use the property you added to the event detail.
    if (event.detail.officer !== 0) {
        /*
            Filter the criminals application state down to the people that committed the crime
        */
        const officerArray = useOfficers()
        const theOfficer = officerArray.find(officerObj => officerObj.id === event.detail.officer)

        const appStateCriminals = useCriminals()

        const matchingCriminals = appStateCriminals.filter(matchedCrime => matchedCrime.arrestingOfficer === theOfficer.name)

        /*
            Then invoke render() and pass the filtered collection as
            an argument
        */
        render(matchingCriminals)
    }
})

export const CriminalList = () => {
    getCriminals()
        .then(getFacilities)
        .then(getCriminalFacilities)
        .then(
            () => {
                // Pull in the data now that it has been fetched
                const facilities = useFacilities()
                const crimFac = useCriminalFacilities()
                const criminals = useCriminals()

                // Pass all three collections of data to render()
                render(criminals, facilities, crimFac)
            }
        )
}

const render = (criminalsToRender, allFacilities, allRelationships) => {
    const contentTarget = document.querySelector(".criminalsContainer")


    // Step 1 - Iterate all criminals

    contentTarget.innerHTML = criminalsToRender.map(
        (criminalObject) => {
            // Step 2 - Filter all relationships to get only ones for this criminal
            const facilityRelationshipsForThisCriminal = allRelationships.filter(cf => cf.criminalId === criminalObject.id)

            // Step 3 - Convert the relationships to facilities with map()
            const facilities = facilityRelationshipsForThisCriminal.map(cf => {
                const matchingFacilityObject = allFacilities.find(facility => facility.id === cf.facilityId)
                return matchingFacilityObject
            })

            // Must pass the matching facilities to the Criminal component
            return Criminal(criminalObject, facilities)
        }
    ).join("")
}