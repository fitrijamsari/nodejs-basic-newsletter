const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { log } = require('console');

const app = express();
const port = process.env.PORT;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data ={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const list_id = "06ab77667c"
    const url = "https://us7.api.mailchimp.com/3.0/lists/" + list_id
    const options = {
        method: 'POST',
        auth:'fitri1:ac5298322d3f24abda621a6139c5bd35-us7'
    }


    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();


})

app.post("/failure", function(req, res){
    res.redirect('/')
})

app.listen(port || 3000, () => {
  console.log(`App listening at http://localhost:${port}`)
});

//ac5298322d3f24abda621a6139c5bd35-us7
//id 06ab77667c
