const Admin = require('../models/adminInfo').Admin

module.exports = {
  find_by_admin_name(admin_name){
    return Admin.find({admin_name}, (err,doc) => {
      return err?[]:doc
    })
  },
  update(_id,json){
    return Admin.findByIdAndUpdate(_id, json, { new: true },(err, doc) => {
      return err?false:true
    })
  },
}