import { witness } from "./witness.js"
import { getWitnesses, useWitnesses } from "./WitnessProvider.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", e => {
    console.log(e)
    if (e.target.id === "witness--button") {
        const witnessEvent = new CustomEvent("showWitnesses")
        eventHub.dispatchEvent(witnessEvent)
        console.log("test")
    }
})

export const addWitnessListener = () => {
    eventHub.addEventListener("showWitnesses", () => {
        console.log("I'm listening")
        getWitnesses().then(
            () => {
                const witnessArray = useWitnesses()
                render(witnessArray)
                handleVisibility()
            }
        )
    })
}

const render = witnessArray => {
    const renderTarget = document.querySelector(".witnessContainer")
    
    let witnessHTML = ""

    witnessArray.forEach(witnessObj => witnessHTML += witness(witnessObj));

    renderTarget.innerHTML = witnessHTML
}

const handleVisibility = () => {
    const criminalTarget = document.querySelector(".criminalsContainer")
    const witnessDisplay = document.querySelector(".witnessContainer")

     if (!(criminalTarget.style.display)) {
            criminalTarget.style.display = "none"
        } else if (criminalTarget.style.display === "flex") {
            criminalTarget.style.display = "none"
        } else if (criminalTarget.style.display === "none") {
            criminalTarget.style.display = "flex"
        }

    if (witnessDisplay.style.display === "flex") {
        witnessDisplay.style.display = "none"
    } else if (witnessDisplay.style.display === "none") {
        witnessDisplay.style.display = "flex"
    } else if (!(witnessDisplay.style.display)) {
        witnessDisplay.style.display = "flex"
    } 
}