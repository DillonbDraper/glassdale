import { getNotes, useNotes } from "./NoteDataProvider.js"
import { NoteHTML } from "./NoteHTML.js"

const eventHub = document.querySelector(".container")
const noteTarget = document.querySelector(".rendered__notes")

eventHub.addEventListener("noteStateChanged", () => {
        NoteList()
    }
)

export const NoteList = () => {
    getNotes().then(
        () => {
             const noteArray = useNotes()
             render(noteArray)
         }
    )
}

const render = (noteArr) => {
    let noteString = ""
    for (const note of noteArr) {
        noteString += NoteHTML(note)
    }

    noteTarget.innerHTML = `<h3> Officer Notes</h3>` + noteString
}