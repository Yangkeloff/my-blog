const mongoose = require('mongoose')
const Schema = mongoose.Schema

const worksSchema = new Schema({
  works_name: String, 
  works_desc: String, 
  works_time: String,
  works_website: String, 
  works_cover: String, 
})

exports.Work = mongoose.model('Work', worksSchema)