// import statements
const express = require("express");

//configuration
const port = process.env.PORT || 8000;
const studentData = [{ id: 1, name: "Imran", age: 23, address: "mumbai" }];
//app initialization
const app = express();


//app middlewares
app.use(express.json());  // acting like middlewares so that we can use req.body


//app routes
//200- ok -- GET
//201- created  --POST
//304 -- not modified --GET
//400- bad request --POST
//401 -- unauthorized --GET
//403 -- forbidden --GET
//404 -- not found --GET
//500- internal server error --GET
app.get("/", (req, res) => {
    res.send("First server updated");
});
app.get("/user", (req, res) => {
    res.send("Hey user welcome to my server");
})
app.get("/user/:name", (req, res) => {
    //params--GET,
    //query--GET, 
    //body--POST,PUT,DELETE
    console.log(req.params);
    res.send("Hey " + req.params.name + " welcome to my server");
})
app.get("/customer", (req, res) => {
    console.log(req.query);
    const {name,age } = req.query;
    res.send(`Hey customer ${name} welcome to my server and your age is ${age}`);
})

app.post('/saveCustomer', (req, res) => {
    console.log(req.body);
    res.send("Customer saved successfully");
})



app.get('/student/list', (req, res) => {
    res.send(studentData);
})

app.post('/student/add', (req, res) => {

    studentData.push({id:studentData.length+1,...req.body});
    res.send(studentData);
})

app.put('/student/update/:id', (req, res) => {
    const id = req.params.id;
    const studentIndex = studentData.findIndex(s => s.id == id);
    console.log(studentIndex);
    studentData[studentIndex] = { ...studentData[studentIndex], ...req.body };
    res.send(studentData)
})

app.delete('/student/:id', (req, res) => {
    const id = req.params.id;
    const studentIndex = studentData.findIndex(s => s.id == id);
    studentData.splice(studentIndex, 1);
    res.send(studentData);
})

//app listen or starting the server
app.listen(port,()=>console.log("server started at port",port));

