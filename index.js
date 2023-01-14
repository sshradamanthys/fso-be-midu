const express = require('express')
let notes = require('./notes')
const cors = require('cors')
const app = express()

// middlewares
app.use(express.json())
app.use(cors())

// logger
app.use((req, _, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.body)
  console.log('----------')
  next()
})

app.get('/', (_, res) => {
  res.send('<h1>Home</h1>')
})

app.get('/api/notes', (_, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)

  const note = notes.find((note) => note.id === id)

  if (note) res.json(note)
  else res.status(404).end()
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((note) => note.id !== id)

  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note content is missing'
    })
  }

  const ids = notes.map((note) => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]
  //   notes = notes.concat(newNote)

  res.status(201).end()
})

// 404
app.use((_, res, next) => {
  res.status(404).json({ error: 'Not Found' })
  next()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
