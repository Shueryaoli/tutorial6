

const url = "mongodb://localhost:27017/waitlistDB";
const url2 = "mongodb://localhost:27017/counters"


const db = connect(url);
const db2 = connect(url2);

db.waitlistDB.insert({
    id:1,
    name:"test",
    number:"12345",
    created:new Date()
})


db.waitlistDB.update({id:1},{name:"test2"});

db.waitlistDB.find({});


db.counters.insert({
    _id:"wait",
    current:1,
})