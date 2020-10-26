import { useCriminals } from "../criminals/CriminalProvider.js"

const eventHub = document.querySelector(".container")

const alibiList = (criminalObj) => {
    const targetHTML = document.querySelector(`#criminal-${criminalObj.id}`)
    

    const criminal = criminalObj.known_associates
    let htmlString = criminal.map(criminal => {
        return `
        <p>Name of associate: ${criminal.name}</p>
        <p>Alibi: ${criminal.alibi}</p>
        `
    }).join("")
        targetHTML.innerHTML += htmlString
    };


export const addAlibiEventListener = () => {
    eventHub.addEventListener("alibisRequested", e => {
        const criminalArray = useCriminals()
        const targetCriminal = criminalArray.find(criminal => criminal.id === e.detail.id)
        alibiList(targetCriminal)
    }
    )
}
