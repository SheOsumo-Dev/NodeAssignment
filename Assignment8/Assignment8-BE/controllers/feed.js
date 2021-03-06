const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Post = require('../models/post');
const User = require('../models/user');



exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  try{
  const totalItems = await Post.find().countDocuments();
  const posts = await Post.find()
        //.populate('creator')
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
      res.status(200).json({
          message: 'Fetched posts successfully.',
          posts: posts,
          totalItems: totalItems
        });
      } catch{
        if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
      }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  // if (!req.file) {
  //   const error = new Error('No image provided.');
  //   error.statusCode = 422;
  //   throw error;
  // }
  //const imageUrl = req.file.path;
  
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: 'images/black-dot.jpg',
    creator: req.userId
  });
  try
  {
  await post.save();
  const user = await User.findById(req.userId);
      user.posts.push(post);
  await user.save();
      res.status(201).json({
        message: 'Post created successfully!',
        post: post,
        creator: {_id: user._id, name:user.name}
      });
  } catch{
    if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  try{
  const post = await Post.findById(postId);
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Post fetched.', post: post });
    } catch{
      if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  try
  {
    const post = await Post.findById(postId)
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      const result = post.save();
      res.status(200).json({ message: 'Post updated!', post: result });
  } catch{
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try{
    const post = Post.findById(postId)
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      // Check logged in user
      clearImage(post.imageUrl);
      const result = await Post.findByIdAndRemove(postId);
      console.log(result);
      res.status(200).json({ message: 'Deleted post.' });
  } catch{
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getStatus = async (req, res, next) => {
  
  try{
    const user = await User.findById(req.userId)
  //Post.findById(postId)
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Status fetched.', user: user });
  } catch {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  //const status = req.body.userstatus;
  try{
  const user = await User.findById(req.userId)
    if (!user) {
      const error = new Error('Could not find user.');
      error.statusCode = 404;
      throw error;
    }
    user.status = req.body.status;
    const result = await user.save();
    res.status(200).json({ message: 'User updated!', user: result });
  } catch {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  // .catch(err => {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // });
  // Post.findById(postId)
  //   .then(post => {
  //     if (!post) {
  //       const error = new Error('Could not find post.');
  //       error.statusCode = 404;
  //       throw error;
  //     }
  //     if (imageUrl !== post.imageUrl) {
  //       clearImage(post.imageUrl);
  //     }
  //     post.title = title;
  //     post.imageUrl = imageUrl;
  //     post.content = content;
  //     return post.save();
  //   })
  //   .then(result => {
  //     res.status(200).json({ message: 'Post updated!', post: result });
  //   })
  //   .catch(err => {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   });
};

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};
