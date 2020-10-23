export const NoteHTML = (noteObj) => {
    return `
        <section class="noteObject">
        <p class="note__date"> Date: ${noteObj.date}</p>
        <p class="note__suspect"> Concerning suspect: ${noteObj.suspect}</p>
        <p class="note__officer"> Inputting officer: ${noteObj.officer}</p>
        <p class="note__text"> Note body: ${noteObj.noteText}</p>
        </section>
    `
}