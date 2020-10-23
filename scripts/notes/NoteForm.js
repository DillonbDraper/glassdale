import { saveNote } from "./NoteDataProvider.js"

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

        // Make a new object representation of a note
        const newNote = {
            date: document.querySelector("#date").value,
            suspect: document.querySelector("#suspectName").value,
            officer: document.querySelector("#officerName").value,
            noteText: document.querySelector("#note-text").value
        }

        // Change API state and application state
        saveNote(newNote)
    }
})


const render = () => {
    contentTarget.innerHTML = `
        <input type="date" id="date">
        <input type="text" id="suspectName" placeholder="Suspect Name...">
        <input type="text" id="officerName" placeholder="Inputting Officer name...">
        <input type="text" id="note-text" placeholder="Note Text">
        <button id="saveNote">Save Note</button>
    `
}

export const NoteForm = () => {
    render()
}