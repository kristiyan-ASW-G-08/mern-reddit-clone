const mongoose = require('mongoose')
const includesCheck = (arr, id) => {
  console.log(arr,id,'includesCheck')
    const check = arr.find(itemId => {
      return itemId.equals(id);
    });
    console.log(check)
    return check;
  };

module.exports  = includesCheck 