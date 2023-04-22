const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose')
const Contact = require('./models/contact')
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({
    extended: true
  }));
app.use(express.static('assets'));

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});

app.get('/', function(req, res){
    Contact.find({}).then((contacts) => {
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });
    }).catch((err) => {
        console.error(err)
    })
})

app.post('/create-contact', function(req, res){
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }).then((newContact) => {
        console.log('*******', newContact);
        return res.redirect('back');
    }).catch((err) => {
        console.error(err);
    })
});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})


app.get('/delete-contact/', function(req, res){
    let id = req.query.id;
    Contact.findByIdAndDelete(id).then(() => {
        return res.redirect('back')
    }).catch((err) => {
        console.log('Error in deleting the database', err);
        return;
    })
});
