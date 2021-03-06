import { useConvictions } from '../convictions/ConvictionProvider.js'
import { useOfficers } from '../officers/OfficerProvider.js'
import { getCriminals, useCriminals } from './CriminalProvider.js'

const eventHub = document.querySelector(".container")

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener('crimeChosen', event => {
    // Use the property you added to the event detail.
    if (event.detail.crimeThatWasChosen !== "0"){
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
    if (event.detail.officer !== 0){
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
    getCriminals().then(
        () => {
             let crimeArray = useCriminals()
             render(crimeArray)
         }

        /*
            Now that you have the data, what
            component should be rendered?
        */
    )
}

const render = criminalArray => {
    let criminalHTML = document.querySelector(".criminalsContainer")
             let crimeString = ""
             for (const criminal of criminalArray) {
                crimeString += `
                <section class="criminal" id="criminal-${criminal.id}">
                <h2>${criminal.name}</h2>
                    <p class="criminal-age">Age: ${criminal.age}</p>
                    <p class="criminal-crime">Crime: ${criminal.conviction}<p>
                    <p class="sentence-start">Term start: ${new Date(criminal.incarceration.start).toLocaleDateString('en-US')}</p>
                    <p class="sentence-end">Term end: ${new Date(criminal.incarceration.end).toLocaleDateString('en-US')}
                    <button id="associates--${criminal.id}">Associate Alibis</button>
                </section>
                `
             }
             criminalHTML.innerHTML = crimeString
}