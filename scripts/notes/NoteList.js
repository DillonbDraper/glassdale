import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"
import { getNotes, useNotes } from "./NoteDataProvider.js"
import { NoteHTML } from "./NoteHTML.js"

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

        return `
            <section class="note">
                <h2>Note about ${relatedCriminal.name}</h2>
                ${note.noteText}
            </section>
        `
    })
}