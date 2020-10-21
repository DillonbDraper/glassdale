import { useConvictions } from '../convictions/ConvictionProvider.js'
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
        const theCrime = convictionsArray.filter(convictionObj => convictionObj.id === parseInt(event.detail.crimeThatWasChosen))
        
        const appStateCriminals = useCriminals()
        
        const matchingCriminals = appStateCriminals.filter(matchedCrime => matchedCrime.conviction === theCrime[0].name)
        
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
                <section class="criminal">
                <h2>${criminal.name}</h2>
                    <p class="criminal-age">Age: ${criminal.age}</p>
                    <p class="criminal-crime">Crime: ${criminal.conviction}<p>
                    <p class="sentence-start">Term start: ${new Date(criminal.incarceration.start).toLocaleDateString('en-US')}</p>
                    <p class="sentence-end">Term end: ${new Date(criminal.incarceration.end).toLocaleDateString('en-US')}
                </section>
                `
             }
             criminalHTML.innerHTML = crimeString
}