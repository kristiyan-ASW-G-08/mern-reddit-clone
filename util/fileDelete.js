const fs = require('fs')
const fileDelete = fileUrl => {
    if(fileUrl){
       fs.unlink(fileUrl,(err) => {
          if(err){
            throw err
          }
        })
      }
}
module.exports = fileDelete