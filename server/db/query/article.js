const Article = require('../models/article').Article

module.exports = {
  find_all(json){
    let { querys = {},fields = null,options = {} } = json
    return Article.find(querys,fields,options,(err,doc) => {
      return err?[]:doc
    })
    .populate({
      path: 'article_tags',
      select: "_id tags_name tags_desc"
    })
  },
  find_by_id(_id){
    return Article.find({_id}, (err,doc) => {
      return err?[]:doc
    })
  },
  update(_id,json){
    return Article.findByIdAndUpdate(_id, json, { new: true },(err, doc) => {
      return err?false:true
    })
  },
  delete(_id){
    return Article.findByIdAndRemove(_id, (err,doc) => {
      return err?false:true
    })
  }
}