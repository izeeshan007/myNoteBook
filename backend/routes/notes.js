const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const User = require("../models/Note");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
const res = require("express/lib/response");

//Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 charactors").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3: update an existing note using: PUT "/api/notes/updatenote". Login required
try {
  router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    //create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      returnres.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  });
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}

//Route 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required

try {
  router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    //find the note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
      returnres.status(404).send("Not Found");
    }
    //allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  });
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}

module.exports = router;
