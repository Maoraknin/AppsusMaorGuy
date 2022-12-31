import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
const NOTE_KEY = 'noteDB'
_createNotes()


export const noteService = {
  query,
  get,
  remove,
  save,
  getNoteEditData,
  getDefaultFillter,
  createNote,
}



function query(fillterBy = getDefaultFillter()) {
  return storageService.query(NOTE_KEY)
    .then(notes => {
      if (fillterBy.txt) {
        const regex = new RegExp(fillterBy.txt, 'i')
        notes = notes.filter(note => (regex.test(note.info.title) || regex.test(note.info.label) || regex.test(note.info.txt)))
      }
      if (fillterBy.noteType) {
        notes = notes.filter(note => (note.type === fillterBy.noteType))
      }

      console.log(notes)
      return notes
    })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note);
  } else {
    return storageService.post(NOTE_KEY, note);
  }
}

function getDefaultFillter() {
  return { txt: '', noteType: '' }
}


function getNoteEditData(note) {
  if (note.type === "note-txt") {
    return { title: note.info.txt, content: '', titleField: 'txt' }
  }

  if (["note-img", "note-vid"].includes(note.type)) {
    return { title: note.info.title, content: note.info.url, titleField: 'title', contentField: 'url' }
  }

  if (note.type === "note-todos") {
    return {
      title: note.info.label, content: note.info.todos.map(todo => todo.txt).join(', '),
      titleField: 'title',
      contentField: 'todos'
    }
  }

  throw new Error('noteType is unknown')

}

function createNote(noteType, textInput, noteData) {
  const color = utilService.getRandomColor()
  if (noteType === "note-txt") {
    return {
      type: "note-txt",
      isPinned: false,
      info: { txt: textInput }, color
    }
  }

  if (noteType === "note-img") {
    return {
      type: "note-img",
      isPinned: false,
      info: {
        url: noteData,
        title: textInput
      }, color
    }
  }

  if (noteType === "note-vid") {
    return {
      type: "note-vid",
      isPinned: false,
      info: {
        url: noteData,
        title: textInput
      }, color
    }
  }

  if (noteType === "note-todos") {
    // 'aa, b,b'
    const todos = noteData.split(',').map(todo => ({ txt: todo.trim(), doneAt: null }))
    return {
      type: "note-todos",
      isPinned: false,
      info: {
        label: textInput, todos
      }, color
    }
  }

  throw new Error('noteType is unknown')
}



function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n101',
        createdAt: 1112222,
        type: 'note-txt',
        isPinned: false,
        color: 'red',
        info: {
          txt: 'Fullstack Me Baby!'
        }
      },
      {
        id: 'n102',
        type: 'note-img',
        isPinned: false,
        info: {
          url: 'data:image/jpeg;base64,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',
          title: 'Bobi and Me'
        },
        color: 'green'
      },
      {
        id: 'n103',
        type: 'note-todos',
        isPinned: false,
        color: 'yellow',
        info: {
          title: 'Get my stuff together',
          todos: [
            { txt: 'Driving liscence', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 }
          ]
        }
      }

    ]
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}


