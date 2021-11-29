import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/NoteContext'


const AddNote = (props) => {

    const {showAlert} = props
    const [item, setItem] = useState({title: "", description: "", tag: ""})

    const context = useContext(noteContext)

    const {createNote} = context

    const handleOnClick =  (e)=>{
        e.preventDefault()
        createNote(item.title, item.description, item.tag)
        showAlert("Added Successfully",'success')
        setItem({title: "", description: "", tag: ""})
    }
    
    const handleOnChange =  (e)=>{
        setItem({...item, [e.target.name]: e.target.value})
    }


    return (
        <div className="container my-5">
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input minLength={5} required type="email" value={item.title} className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={handleOnChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" className="form-control" value={item.description} id="description" name='description' onChange={handleOnChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                    <input minLength={5} required type="text" value={item.tag} className="form-control" id="tag" name='tag' onChange={handleOnChange}/>
                </div>
                <button disabled={item.title.length < 5 || item.description.length< 5 || item.tag.length === 0} type="submit" className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
