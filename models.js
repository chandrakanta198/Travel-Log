const mongoose=require('mongoose');


//schema
const userCollectionSchema= new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    savedExperiences: [{type: mongoose.Schema.Types.ObjectId, ref: 'TravelExperience'}],
    favouriteExperiences: [{type: mongoose.Schema.Types.ObjectId, ref: 'TravelExperience'}]
});



const travelExperienceSchema= new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    location: {
        type:String,
        required: true
    },
    images: {
        type:[String],
    },
    cost: {
        type:Number,
    },
    heritage: {
        type:String,
    },
    placeToVisit: {
        type: [String],
    },
    ratings: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'RatingReview'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'RatingReview'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
    },
    isDeleted: {
        type: Boolean, 
        default: false
    }
});



const ratingReviewSchema= new mongoose.Schema({
    rating: {
        type:Number,
        required: true
    },
    review:{
        type:String,
        required: true
    },
    experienceId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'TravelExperience',
         required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
    }
});


const postSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    content: {
        type:String,
        required: true
    },
    images: {
        type:[String],
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdOn: {
        type:Date,
        default: Date.now,
        required:true
      },
    isDeleted: {
        type: Boolean, 
        default: false
    }
});



const commentSchema= new mongoose.Schema({
    content: {
        type:String,
        required: true
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    experienceId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'TravelExperience'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdOn: {
        type:Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});


const adminSchema= new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    }
});


//models
module.exports = {
    User: mongoose.model('User', userCollectionSchema),
    TravelExperience: mongoose.model('TravelExperience', travelExperienceSchema),
    RatingReview: mongoose.model('RatingReview', ratingReviewSchema),
    Post: mongoose.model('Post', postSchema),
    Comment: mongoose.model('Comment', commentSchema),
    Admin: mongoose.model('Admin', adminSchema)
}