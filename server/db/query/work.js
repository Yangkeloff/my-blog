const Work = require('../models/work').Work

module.exports = {
  find_all(json){
    let { querys = {},fields = null,options = {} } = json
    return Work.find(querys,fields,options,(err,doc) => {
      return err?[]:doc
    })
  },
  update(_id,json){
    return Work.findByIdAndUpdate(_id, json, { new: true },(err, doc) => {
      return err?false:true
    })
  },
  delete(_id){
    return Work.findByIdAndRemove(_id, (err,doc) => {
      return err?false:true
    })
  }
}