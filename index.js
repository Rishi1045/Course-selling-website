/*
## Create a course selling app 

Initialize a new Node.js project 
Add Express, jsonwebtoken, mongoose to it as a dependency 
Create index.js 
I 
Add route skeleton for user login, signup, purchase a course, sees all courses, sees the purchased courses course 
Add routes for admin login, admin signup, create a course, delete a course, add course content. 
Add middlewares for user and admin auth 
Add a database (mongodb), use dotenv to store the database connection string 
Define the schema for User, Admin, Course, Purchase 
Complete the routes for user login, signup, purchase a course, see course (Extra points Use express routing to 
better structure your routes) 
Create the frontend

*/

require('dotenv').config()
const express = require("express");
const app = express();

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin")



app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);


async function main(){

    //dot env   
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
    console.log("listening on port 3000");
}

