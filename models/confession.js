const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const confessionSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

const Confession = mongoose.model("Confession", confessionSchema);
module.exports = Confession;
