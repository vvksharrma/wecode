const mongoose =require('mongoose');
const {Schema,model}=mongoose;

const PostScheme=new Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
    author:String,
    authorId:String
},{
    timestamps:true,
})

const PostModel = model('post',PostScheme);

module.exports=PostModel