import { ConvictionSelect } from "./convictions/ConvictionSelect.js"
import { CriminalList} from "./criminals/CriminalList.js"
import { NoteForm } from "./notes/NoteForm.js"
import { NoteList } from "./notes/NoteList.js"
import { OfficerSelect } from "./officers/OfficerSelect.js"
import { addAlibiEventListener } from "./alibis/AlibiList.js"

CriminalList()
ConvictionSelect()
OfficerSelect()
NoteForm()
NoteList()
addAlibiEventListener()
