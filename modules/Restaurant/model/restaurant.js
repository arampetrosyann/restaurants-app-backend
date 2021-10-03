const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        url: {
            type: String,
            default: "",
        },
        phoneNumbers: {
            type: [String],
            default: [],
        },
        description: {
            type: String,
            default: "",
            trim: true,
        },
        location: {
            country: { type: String },
            city: { type: String },
            address: { type: String },
            latitude: { type: String },
            longitude: { type: String },
            zipcode: { type: String },
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        timings: {
            type: Map,
        },
    },
    { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
