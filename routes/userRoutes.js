import express from 'express';
import User from '../models/User';
import formidable from 'formidable';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config';

const app = module.exports = express.Router();

app.get('/', (req, res) => {
    res.send("here's root url. userRoutes get /")
});
app.post('/login', (req, res) => {
    let userDetails = req.body;    
    let user = User.findOne({username: req.body.username})
        .then((user) => {
            if (!user) {
                return res.status(401).send({message: req.body.username + " not registered."});
            }
            
            //console.info(hash + " versus " + user.password);
            let hash = user.password;
            let password = userDetails.password;
            //console.log(hash);
            if (!bcrypt.compareSync(password, hash)) { 
                return res.status(401).send({message: "Invalid User Credentials"});
            }
            
            let tempUser = user.toJSON();
            tempUser.password = ''; // as jwt's are not, strictly speaking, encrypted
            let token = jwt.sign(tempUser, SECRET);
            tempUser.token = token;
            return res.status(200).send({user: tempUser}); // todo: send token
        })
        .catch((error) => {
            console.log(error)
            return res.status(401).send({message: "Invalid user credentials"})
        });   

});
app.get('/users', (req, res) => {    
    let users = User.find()
        .then((users) => {            
            res.status(200).send(users)
        })
        .catch((error) => {           
            return res.status(418).send({message: error.message})
        })
})
app.post('/users', (req, res) => {    
    let user = new User(req.body);
    // todo: mail confirm etc
    // hash password
    if (!user.username || !user.password) {
        return res.status(418).send({message: 'Fill in required fields.'})
    }
    //console.info(user.password);
    const salt = bcrypt.genSaltSync();  
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    user.save((error, user) => {
        if(error) {
            console.log(error);
            return res.status(418).send(error.message)
        }        
        return res.status(201).send({message: 'zomg, success'})
    })
})
app.post('/images', (req, res) => {
    try {
        var form = new formidable.IncomingForm();
        form.parse(req);
        let newName = '';
        form.on('fileBegin', function(name, file) {
            newName = file.name.slice();            
            file.path = '/home/ross/js/venue_server/images/' + file.name;
        });
        res.status(201).send({message: 'zomg', url: newName})
    }
    catch(error) {
        res.status(418).send({message: error.message})
    }
})
    