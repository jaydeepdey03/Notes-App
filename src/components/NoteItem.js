import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const { note, updateNotes } = props;
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { showAlert } = props
    return (
        <div className='col-md-3 my-3'>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex justify-content-between">
                        <i className="far fa-edit" onClick={() => {
                            updateNotes(note)
                        }}></i>
                        <i className="far fa-trash-alt" onClick={() => {
                            deleteNote(note._id);
                            showAlert("Deleted Successfully", 'success')
                        }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
