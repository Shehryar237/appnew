const express = require('express')
const app = express()
const cors=require('cors')

app.use(express.json())
app.use(cors())

let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

  const generateId = ()=>{
    const maxId = notes.length >0
        ? Math.max(...notes.map(n=>Number(n.id)))
        :0
    return String(maxId + 1)
  }


  app.post('/api/notes',(request,response)=>{
    const body= request.body

    if(!body.content){ //body will be note obj itself
        return response.status(400).json({// we call return so code dosent execute till the end
            error:'missing content'
        })
    }

    const note = {
        content:body.content,
        import:Boolean(body.important)||false,
        id:generateId(),
    }


    notes = notes.concat(note)

    console.log(note)
    response.json(note)
  }) //this what server recivive from client

  
  app.get('/',(request, response)=>{
    response.send('<h1>hello world</h1>')
  })


  app.get('/api/notes',(request, response)=>{  //if someone visit /api/notes, reutrn ntoes in json
    response.json(notes)
  })


  app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id  //grab it from url
    const note = notes.find(note => note.id === id)
    //if note is found return it as json to client that requested it
    if (note) {
        response.json(note)
      } 
    else {
        response.status(404).end()
      }
  })

  app.delete('/api/notes/:id',(reuest, response)=>{
    const id=request.params.id
    notes = notes.filter(note => notes.id === id)

    response.status(204).end()
  })

  app.patch('/api/notes/:id',(request, response)=>{
    const id = request.params.id
    const noteToToggle = notes.find(note=>note.id===id)

    if(!noteToToggle){
      return response.status(404).json({error:'note not found'})
    }

    noteToToggle.important = !noteToToggle.important

    response.json(noteToToggle)//send this back to noteService update

  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })