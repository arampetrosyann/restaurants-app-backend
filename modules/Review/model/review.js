const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
        },
        review: {
            type: String,
            required: true,
            minlength: 2,
            trim: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
            default: 0,
        },
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
        },
    },
    { timestamps: { createdAt: "date", updatedAt: true } }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
