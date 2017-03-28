var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var trashLevelSchema = Schema({
    trash_level: {type: String, required: true}, 
    time_stamp: {type: Date, default: Date.now},
});

trashLevelSchema
.virtual('level')
.get(function() {
    return this.trash_level;
});

trashLevelSchema
.virtual('time')
.get(function() {
    return this.time_stamp;
}); 

// export module
module.exports = mongoose.model('trashLevel', trashLevelSchema);
