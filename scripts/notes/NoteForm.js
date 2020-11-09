import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"
import { saveNote } from "./NoteDataProvider.js"

let criminals = []

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

        // Make a new object representation of a note
        const newNote = {
            criminalId: document.querySelector("#noteForm--criminal").value,
            noteText: document.querySelector("#note-text").value
        }

        // Change API state and application state
        saveNote(newNote)
    }
})


const render = (criminalArray) => {

    contentTarget.innerHTML = `
        <input type="date" id="date">
        <select id="noteForm--criminal" class="criminalSelect">
        ${criminalArray.map(criminal => `<option value ="${criminal.id}"> ${criminal.name}</option>`).join(",")}
        </select>
        <input type="text" id="officerName" placeholder="Inputting Officer name...">
        <input type="text" id="note-text" placeholder="Note Text">
        <button id="saveNote">Save Note</button>
    `
}

export const NoteForm = () => {
    getCriminals().then(() => {
        criminals = useCriminals()
        render(criminals)
    })
}