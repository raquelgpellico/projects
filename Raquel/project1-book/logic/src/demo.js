const { mongoose: { connect, disconnect }} = require ("data");

connect ("mongodb://localhost:27017/project")
    .then (() => console.log ("connected to mongo"))


    .then (()=> disconnect ())
    .then (() => console.log ("disconnected from mongo"))
