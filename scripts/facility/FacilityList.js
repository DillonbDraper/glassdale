import { getFacilities, useFacilities } from "./FacilityProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "./CriminalFacilityProvider.js"
import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"
import { Facility } from "./Facility.js"

const eventHub = document.querySelector(".container")

export const FacilityList = () => {

    getCriminals()
        .then(getFacilities)
        .then(getCriminalFacilities)
        .then(
            () => {
                const facilities = useFacilities()
                const crimFac = useCriminalFacilities()
                const criminals = useCriminals()

                console.log(criminals)

                render(facilities, criminals, crimFac)
            })
}

const render = (facilitiesToRender, allCriminals, allRelationships) => {
    const contentTarget = document.querySelector(".facilityContainer")

    // Step 1 - Iterate all criminals

    contentTarget.innerHTML = facilitiesToRender.map(
        (facilityObject) => {
            // Step 2 - Filter all relationships to get only ones for this criminal
            const relationshipsForThisFacility = allRelationships.filter(cf => cf.facilityId === facilityObject.id)

            console.log(relationshipsForThisFacility)
            // Step 3 - Convert the relationships to facilities with map()

            const criminals = relationshipsForThisFacility.map(cf => {
                const matchingCriminalObjects = allCriminals.find(criminal => criminal.id === cf.criminalId)
                return matchingCriminalObjects
            })
            console.log(criminals)
            // Must pass the matching facilities to the Facility component
            return Facility(facilityObject, criminals)
        }
    ).join("")
}

eventHub.addEventListener("facilitiesButtonClicked", e => {
    let facilityDisplay = document.querySelector(".facilityContainer")
  
    if (!(facilityDisplay.style.display)) {
        facilityDisplay.style.display = "flex"
    } else if (facilityDisplay.style.display === "flex") {
        facilityDisplay.style.display = "none"
    } else if (facilityDisplay.style.display === "none") {
        facilityDisplay.style.display = "flex"
    }
})