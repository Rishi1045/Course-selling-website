const { router } = require("express");
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config");
const { userModel, purchaseModel } = require("../db");
const userRouter = Router();
const { userMiddleware } = require("../middleware/user");
const course = require("./course");
app.use(express.json());

userRouter.post("/signup", async function(req, res){
    const { email, password, firstName, lastName } = req.body // todo -> to add zod validation
    //TODO -> hash the password so that plain password is not stored in the Db

    await userModel.create({
        email: email,
        password: password,
        firstName,
        lastName
    })

    res.json({
        message: "Signup succeded"
    })
})

userRouter.post("/signin", async function(req, res){
    const { email, password } = req.body;

    //ideally password should be hashed, and hence you cant compare the user provided password and the database password
    const user = await userModel.findOne({
        email: email,
        password: password
    })

    if(user){
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);
    

    //do cookie logic

        res.json({
            token: token
        })
    }

    else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }

})

userRouter.get("/purchases", userMiddleware, async function(req, res){
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    })  

    res,json({
        purchases
    })
})

module.exports = {
    userRouter: userRouter
}
