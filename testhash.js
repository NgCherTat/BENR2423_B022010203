const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs")
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.3owbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(async err => {
    if (err) {
        console.log(err.message)
        return
    }
    console.log('Connected to MongoDB')
    let name = [];
    
    for (let i = 0; i < 15; i++) {
    //Array to store all the names
    const Name = faker.name.firstName();
    const password = "mypass123"
    const saltRounds = 10
    const new_password = "0"

    
    bcrypt.genSalt(saltRounds, function (saltError, salt){
        if(saltError){
            throw saltError
        }else{
            bcrypt.hash(password, salt, function(hashError, hash){
                if (hashError){
                    throw hashError
                }else {
                    console.log(hash)
                    const new_password = hash
                    
                    //console.log(new_password)
                    name.push({ Name,new_password});
                    client.db("test_code").collection("week3").insertMany(name).then(result => {
                        console.log(result);
                    });
                }
            })
        }

    })
    }
});