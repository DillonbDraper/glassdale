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
            }
        )
    })
}

const render = witnessArray => {
    const renderTarget = document.querySelector(".criminalsContainer")
    let witnessHTML = ""

    witnessArray.forEach(witnessObj => witnessHTML += witness(witnessObj));

    renderTarget.innerHTML = witnessHTML
}