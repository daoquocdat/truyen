const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const TruyenSchema = new Schema({
	tentruyen:{ type: String, default: ''},
	theloai:{ type: String, default: ''},
	mota:{ type: String, default: ''},
	hinh:{ type: String, default: ''},
	slug: { type: String, slug: 'tentruyen', unique: true },
},{
	timestamps: true,
});

module.exports = mongoose.model('Truyen', TruyenSchema)