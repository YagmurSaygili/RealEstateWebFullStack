const express = require('express'); //Explanation ! 
const app = express();
const cors = require("cors"); 

app.use(express.json()); // To deal with the format parsing issue
app.use(cors());


const db = require('./models');

// Routers
const propertyRouter = require("./routes/Properties");
app.use("/properties", propertyRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () =>{
        console.log("Server running on port 3001");
    });
});



// Nodemon package restarts the server every time you save index.js
// with the appropriate addition to package.json --> Did not work 