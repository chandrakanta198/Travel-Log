const express = require("express");
const bodyParser=require("body-parser");
const mongoose = require("mongoose");
const router=express.Router();
const cors=require("cors");


const app=express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.set('view engine','ejs');

//import models
const {User, TravelExperience, RatingReview, Post, Comment, Admin}=require('./models');

// Connect to MongoDB database
mongoose
	.connect("mongodb://127.0.0.1:27017/travelLog", { useNewUrlParser: true, useUnifiedTopology:true })
	.then(() => {
		console.log("Server has started!");
}).catch((err)=>{
    console.error('Error connecting to db: ',err.message);
});


app.use(router);
//query all the user in collection

router.get('/users',async(req,res)=>{
    try{
        const users=await User.find();
        res.json();
    }catch(err){
        next(err);
    }
});
//add new user to collection
router.post('/users',async(req,res)=>{
    const {name, email, password, savedExperiences, favouriteExperiences}=req.body;
    try{
        const newUser= new User({name, email, password, savedExperiences, favouriteExperiences});
        await newUser.save();
        res.json(newUser);
    }catch(err){
        next(err);
    }
});

//query all the travel experience in collection

router.get('/travel-experiences',async(req,res)=>{
    try{
        const travelExperiences=await TravelExperience.find();
        res.json(travelExperiences);
    }catch(err){
        next(err);
    }
});
//add new travel experience to collection
router.post('/travel-experiences',async(req,res)=>{
    const {name, location, images, cost, heritage, placeToVisit, createdBy}=req.body;
    try{
        const newTravelExperience= new TravelExperience({name, location, images, cost, heritage, placeToVisit, createdBy});
        await newTravelExperience.save();
        res.json(newTravelExperience);
    }catch(err){
        next(err);
    }
});

//query all the rating and reviews in collection

router.get('/rating-reviews',async(req,res)=>{
    try{
        const ratingReviews=await RatingReview.find();
        res.json(ratingReviews);
    }catch(err){
        next(err);
    }
});
//add new rating and review to collection
router.post('/rating-reviews',async(req,res)=>{
    const {rating, review}=req.body;
    try{
        const newRatingReview= new RatingReview({rating, review});
        await newRatingReview.save();
        res.json(newRatingReview);
    }catch(err){
        next(err);
    }
});


//query all the post in collection
router.get('/posts',async(req,res)=>{
    try{
        const posts=await Post.find();
        res.json(posts);
    }catch(err){
        next(err);
    }
});
//add new post to collection
router.post('/posts',async(req,res)=>{
    const {title, content, images, createdOn}=req.body;
    try{
        const newPost= new Post({title, content, images, createdOn});
        await newPost.save();
        res.json(newPost);
    }catch(err){
        next(err);
    }
});

//query all the comment in collection
router.get('/comments',async(req,res)=>{
    try{
        const comments=await Comment.find();
        res.json(comments);
    }catch(err){
        next(err);
    }
});
//add new comment to collection
router.post('/comments',async(req,res)=>{
    const {content, createdOn}=req.body;
    try{
        const newComment= new Comment({content, createdOn});
        await newComment.save();
        res.json(newComment);
    }catch(err){
        next(err);
    }
});

app.use((err, req, res, next)=>{
    console.error(err.message);
    res.status(500).send('server error');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});