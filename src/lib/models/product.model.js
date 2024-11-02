import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userProfileImage: {
        type: String
    },
    text: {
        type: String,
        required: true,
        minlength: 1 
    },
    commentStatus: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        index: true 
    },
    productDescription: {
        type: String,
        required: true
    },
    productImage: {
        type: String
    },
    productPrice: {
        type: Number,
        required: true
    },
    isSold: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    },
    productCategory: {
        type: String,
        required: true
    },
    productOwnerId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userProfileImage: {
        type: String
    },
    comments: [commentSchema],
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export { Product };
