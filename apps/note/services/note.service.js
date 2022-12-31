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
          url: 'http://some-img/me',
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


