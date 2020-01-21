const mongoose = require('mongoose')
mongoose.connect('mongodb://hufangyi:123456@127.0.0.1:27017/testdb', {useNewUrlParser: true,useUnifiedTopology:true})
const User = mongoose.model('users', {name: String,age: Number, email: String})

const newUser = new User({
  name:'shenhailin',
  age:100,
  email:'111@qq.com'
})
newUser.save().then(()=>{
  console.log('保存成功')
})