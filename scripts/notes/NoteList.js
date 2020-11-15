import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"
import { getNotes, useNotes } from "./NoteDataProvider.js"
import { deleteNote } from "./NoteDataProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".rendered__notes")

eventHub.addEventListener("noteStateChanged", () => {
    NoteList()
}
)

export const NoteList = () => {
    getNotes()
        .then(getCriminals).then(
            () => {
                const noteArray = useNotes()
                const criminalArray = useCriminals()
                render(noteArray, criminalArray)
            }
        )
}

const render = (noteCollection, criminalCollection) => {
    contentTarget.innerHTML = noteCollection.map(note => {
        // Find the related criminal
        const relatedCriminal = criminalCollection.find(criminal => criminal.id === parseInt(note.criminalId))
        console.log(relatedCriminal)
        return `
            <section class="note">
                <h2>Note about ${relatedCriminal.name}</h2>
                <h5>On ${note.noteDate}
                <h5>From Officer ${note.inputtingOfficer}</h5>
                <p>${note.noteText}<p>
                <button id="deleteNote--${note.id}">Delete</button>
            </section>
        `
    }).join("")
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, id] = clickEvent.target.id.split("--")

        /*
            Invoke the function that performs the delete operation.

            Once the operation is complete you should THEN invoke
            useNotes() and render the note list again.
        */
        deleteNote(id).then(
            () => {
                const updatedNotes = useNotes()
                const criminals = useCriminals()
                render(updatedNotes, criminals)
            }
        )
    }
})