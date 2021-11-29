const express = require('express')
const fetchUser = require('../Middleware/fetchUser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

const router = express.Router()


// ROUTE 1: Get all the Notes using: GET "api/notes/fetchallnotes" : Login Required
router.get('/fetchallnotes', fetchUser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some error occured')
    }

})

// ROUTE 2: Add new notes: POST "api/notes/addnote" : Login Required
router.post('/addnote', fetchUser, [
    body('title', 'Title is of less than 5 character').isLength({ min: 5 }),
    body('description', 'Description is of less than 5 character').isLength({ min: 5 }),
], async (req, res) => {

    // Return bad request and errors if it exists 

    // validationResult(): Extracts the validation errors from a request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body

        const note = new Notes({ title, description, tag, user: req.user.id })

        const savedNotes = await note.save()

        res.json(savedNotes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some error occured')
    }
})

// ROUTE 3: Update notes: PUT "api/notes/updatenote/:id" : Login Required
router.put('/updatenote/:id', fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body
        // Create a blank note object
        const newNote = {}
        if(title) newNote.title = title
        if(description) newNote.description = description
        if(tag) newNote.tag = tag

        // Find the note by ID and update it
        let note = await Notes.findById(req.params.id)
        if(!note) {return res.status(404).send("Not Found")}


        // Allow user to update the note only if he owns it
        if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})


        res.json({note})

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some error occured')
    }
})

// ROUTE 4: Delete notes: DELETE "api/notes/deletenotes/:id" : Login Required
router.delete('/deletenotes/:id', fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body
        // Create a blank note object
        const newNote = {}
        if(title) newNote.title = title
        if(description) newNote.description = description
        if(tag) newNote.tag = tag

        // Find the note by ID and delete it
        let note = await Notes.findById(req.params.id)
        if(!note) {return res.status(404).send("Not Found")}

        // Allow user to delete the note only if he owns it
        if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted", id: note.id})

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some error occured')
    }
})

module.exports = router