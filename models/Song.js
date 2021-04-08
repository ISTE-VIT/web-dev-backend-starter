const mongoose = require('mongoose')

const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
  },
  img_url: {
    type: String,
    required: true,
    validate: urlRegex,
  },
  song_url: {
    type: String,
    required: true,
    validate: urlRegex,
  },
})

const Song = mongoose.model('Song', songSchema)
module.exports = Song
