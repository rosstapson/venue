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
    email: {
      type: 'String',
      required: [
        true, 'Email address required'
      ]
    },
    password: {
      type: 'String',
      required: [
        true, 'Password required'
      ]
    },
    imageUrl: {
        type: 'String'
    },
    address: [{type: 'String'}],
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