import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) => {

  const host = "http://localhost:5000"

  const noteInitial = []

  const [note, setNote] = useState(noteInitial)


  // FETCH NOTES
  const getNotes = async () => {
    //API CALLS 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('auth-token'),
      },
    });
    const json = await response.json()
    console.log(json)
    setNote(json)

  }

  // Create a Note
  const createNote = async (title, description, tag) => {
    // FETCH API Call Pending
    //API CALLS 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json()
    setNote(note.concat(json))
  }

  // Update a Note
  const updateNote = async (id, title, description, tag) => {

    //API CALLS 
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({ title, description, tag })
    });

    // Logic to edit the client
    let newUpdatedNote = JSON.parse(JSON.stringify(note))

    for (let index = 0; index < newUpdatedNote.length; index++) {
      const element = newUpdatedNote[index]
      if (element._id === id) {
        newUpdatedNote[index].title = title
        newUpdatedNote[index].description = description
        newUpdatedNote[index].tag = tag
        break
      }
    }
    setNote(newUpdatedNote)
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API CALL
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('auth-token'),
      },
    });

    console.log('delete working' + id)
    let deletedNote = note.filter((e) => { return e._id !== id })
    setNote(deletedNote)
  }

  return (
    <NoteContext.Provider value={{ note, createNote, updateNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState