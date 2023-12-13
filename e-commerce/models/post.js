const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

      // topic:{
      //       type:String,
      //       required:true
      // },
      // description:{
      //       type:String,
      //       required:true
      // },
      // postCategory:{
      //       type:String,
      //       required:true
      // }


      img: {
            type: String,
            required: true
      },
      title: {
            type: String,
            required: true
      },
      star: {
            type: String,
            required: true
      },
      reviews: {
            type: String,
            required: true
      },
      prevPrice: {
            type: String,
            required: true
      },
      newPrice: {
            type: String,
            required: true
      },
      company: {
            type: String,
            required: true
      },
      color: {
            type: String,
            required: true
      },
      category: {
            type: String,
            required: true
      }
});

module.exports = mongoose.model('Posts', postSchema);