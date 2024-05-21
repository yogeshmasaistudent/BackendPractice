// Routes.Post.Router.js
const express = require("express");
const { PostModel } = require("../models/Post.Model");
const PostRouter = express.Router();

// Create New Post

PostRouter.post("/", async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const NewPost = new PostModel({
      title,
      content,
      author,
    });
    await NewPost.save();
    return res.status(200).json({ msg: "New Post has been added", NewPost });
  } catch (error) {
    return res.status(400).json({ msg: "Internal Server Error!" });
  }
});

// Read All Post
PostRouter.get("/", async (req, res) => {
  try {
    const Post = await PostModel.find();
    return res.status(200).json({ msg: "These are All Post", Post });
  } catch (error) {
    return res.status(400).json({ msg: "Internal Server Error" });
  }
});

// Read a Post By ID
PostRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const Post = await PostModel.findById(id);
    if (!Post) {
      return res.status(409).json({ msg: "Post Not Found" });
    }
    return res.status(200).json({ msg: "Post with this id", Post: Post });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
});


// Update a Post By ID 
PostRouter.put("/:id",async(req,res)=>{
    const {id} = req.params;
    const {title,content,author} = req.body;
    try {
      const UpdatedPost = await PostModel.findByIdAndUpdate(id,{title,content,author},{new:true});
      if(!UpdatedPost){
        return res.status(400).json({msg:"Post Did Not Found"})
      }
      return res.status(200).json({msg:"Post has been Updated",UpdatedPost})
    } catch (error) {
        return res.status({msg:error})
    }
})


// Delete a Post 
PostRouter.delete("/:id",async(req,res)=>{
  const {id} = req.params;
  try {
    const DeletePost = await PostModel.findByIdAndDelete(id);
    if(!DeletePost){
      return res.status(400).json({msg:"Post Don't Found !"})
    }
      return res.status(200).json({msg:"Post has been Deleted"})
    
  } catch (error) {
    return res.status(200).json({msg:"Internal Error !"})
  }
})

module.exports = {
  PostRouter,
};
