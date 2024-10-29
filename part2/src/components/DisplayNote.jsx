const DisplayNote= ({note, toggleImportance}) =>{
const label = note.important
?'maken not important':'make important'

    return(
      <div>
        <li>{note.content}
          <button onClick={toggleImportance}>{label}</button>
        </li>
      </div>
  
    )
  }

  export default DisplayNote