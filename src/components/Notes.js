import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useHistory } from 'react-router-dom'

export const Notes = (props) => {
    const { showAlert } = props
    const context = useContext(noteContext)
    const { note, getNotes, updateNote } = context
    const ref = useRef(null)
    const refClose = useRef(null)
    const history = useHistory()

    const [item, setItem] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    useEffect(() => {
        if(localStorage.getItem('auth-token')){
            getNotes()
        }
        else{
            showAlert("Not Logged in", 'danger')
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])

    const updateNotes = (currentNote) => {
        ref.current.click()
        setItem({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleOnClick = (e) => {
        updateNote(item.id, item.etitle, item.edescription, item.etag)
        refClose.current.click()
        showAlert("Updated Successfully",'success')
        console.log(item)
    }

    const handleOnChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote showAlert={showAlert} />
            <button ref={ref} style={{ display: 'none' }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                        <input minLength={5} required type="email" className="form-control" id="etitle" name='etitle' value={item.etitle} aria-describedby="emailHelp" onChange={handleOnChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                        <input minLength={5} required type="text" className="form-control" id="edescription" name='edescription' value={item.edescription} onChange={handleOnChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                        <input minLength={5} required type="text" className="form-control" id="etag" name='etag' value={item.etag} onChange={handleOnChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={handleOnClick} type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <div className="container">{note.length === 0 && "No Notes available"} </div>
                {note.map((e) => {
                    return <NoteItem key={e._id} showAlert={showAlert} updateNotes={updateNotes} note={e} />
                })}
            </div>
        </>
    )
}
