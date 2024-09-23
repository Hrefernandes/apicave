const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
    {
        label: {
            type: String,
            required: true
        }
    },
    {
        collection: 'categories'
    }
);
module.exports = mongoose.model('Category', categorySchema);

