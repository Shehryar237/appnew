import DisplayNote from "./components/DisplayNote"
import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Notification from "./components/Notification"

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('new note')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])


  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)

    if (!note) {
      console.error(`Note with id ${id} not found`);
      return;
    }

    const changedNote = { ...note, important: !note.important }
  
    noteService//we pass id and changednote(obj) to update which puts it in axios request
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      //update->send axiom request to backend that return response-->update send response.data(note)to then
      //then send it to arrow func->arrow func
      //so update --note-->then --note--> arrow
      //returnedNote is just variable name
      .catch(error => {
        console.error('Error updating note:', error);
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        )
        setTimeout(()=>{setErrorMessage(null)},5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote=(event)=>{
    event.preventDefault()
    console.log('button clicked', event.target)

    //create note
    const noteObject ={
      content: newNote,
      important: Math.random() < 0.5,
    }
    
    
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
    
    

  }

  const toggleFilter = () => {
    setShowAll(!showAll)
  }

  // change the newNote as user is typing, as it update evreytime input changes
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  //if showall is true then notesToShow = notes, else filtered
  //notesToShow is array
  const notesToShow = showAll?notes : notes.filter(note=>note.important === true)
  //filter returns new array containin only notes with important boolean


  return (
    <div>
      <h1>Notes</h1>
      <Notification message ={errorMessage}/>
      <div><button onClick={toggleFilter}> {showAll?"Show important": "Show All"}</button></div>
      <ul>
        {notesToShow.map(note => 
        <li className='note'>
          <DisplayNote note={note} key={note.id} 
          toggleImportance={()=>toggleImportanceOf(note.id)}/>
        </li>
      )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/><button type="submit">save</button>
      </form>
      <Footer/ >
    </div>
  )
}

export default App