import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: 'String',
        required: [
          true, "Username required"
        ],
        unique: [true, "Username is not available"]
    },    
    imageUrl: {
        type: 'String'
    },
    address: {
        line1: {
          type: 'String',
          required: false
        },
        line2: {
          type: 'String',
          required: false
        },
        line3: {
          type: 'String',
          required: false
        },
        state: {
          type: 'String',
          required: false
        },
        country: {
          type: 'String',
          required: false
        }
    },
    contactNumber: {
        type: 'String',
        required: false
    },    
    dateAdded: {
        type: 'Date',
        default: Date.now,
        required: true
    }
});
const myModel = mongoose.model('User', userSchema);
//console.log("modelled");
export default myModel;