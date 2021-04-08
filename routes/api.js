const express = require('express')
const Song = require('../models/Song')

const router = express.Router()

router.post('/songs', async (req, res) => {
  const { name, artist, img_url, song_url } = req.body
  song = await Song.create({
    name,
    artist,
    img_url,
    song_url,
  })
  return res.send(song)
})

router.delete('/songs/:id', async (req, res) => {
  const song = await Song.findByIdAndRemove(req.params.id)
  return res.send(song)
})

router.get('/songs/:id', async (req, res) => {
  const song = await Song.findById(req.params.id)
  return res.send(song||"not found")
})

router.get('/search', async (req, res) => {
  s = req.query.q
  let songs
  if (s === '') {
    songs = await Song.find({})
  } else {
    songs = await Song.find({ name: { $regex: s, $options: 'i' } })
  }
  return res.send(songs)
})

module.exports = router
