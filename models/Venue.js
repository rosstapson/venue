import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const venueSchema = new Schema({
    name: {
        type: 'String',
        required: [
          true, "Venue name required"
        ],
        unique: [true, "Venue name is not available"]
    },
    constactUser: {
        id: ''
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
    email: {
        type: 'String',
        required: false
    },
    dateAdded: {
        type: 'Date',
        default: Date.now,
        required: true
    }
});
const myModel = mongoose.model('Venue', venueSchema);
//console.log("modelled");
export default myModel;