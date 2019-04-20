const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  article_title: String,
	article_tags: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Tag'
  }], 
  article_create_time: {type: String, default: Date.now},
  article_update_time: {type: String, default: Date.now},
  article_state: {
    type: Number,
    default: 1 // 0 => draft  1=> published
  }, 
  article_cover: String,
  article_desc: String,
  article_content: String
})

const TagsSchema = new Schema({
  tags_name: String, 
  tags_desc: String
})

exports.Article = mongoose.model('Article', articleSchema)
exports.Tag = mongoose.model('Tag', TagsSchema)