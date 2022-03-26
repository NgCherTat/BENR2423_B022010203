const { faker } = require('@faker-js/faker');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.lub5x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect( err => {
    if (err) {
        console.log(err.message)
        return
    }
    console.log('Connected to MongoDB')

    //Array to store all the names
    let name = [];
    for (let i = 0; i < 15; i++) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const avatarUrl = faker.image.avatar();
        const natureImageUrl = faker.image.nature();
        name.push({ firstName, lastName , avatarUrl , natureImageUrl});
    }

    //initial count of documents in database
    client.db("new").collection("names").countDocuments().then(result => {
        console.log(result);
    });

    //time to insert all the names
    console.time('time');

    //insert all the names into collection
    client.db("new").collection("names").insertMany(name).then(result => {
        console.log(result);
    });

    //time to insert all the names
    console.timeEnd('time');

    //count of documents in database after inserting all the names
    client.db("new").collection("names").countDocuments().then(result => {
        console.log(result);
    });

    //close the connection
    console.log('Completed');
});
