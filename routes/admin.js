const { router } = require("express");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

const adminRouter = Router();

const {adminModel} = require("../db");
const { adminMiddleware } = require("../middleware/admin");


adminRouter.post("/signup", function(req, res){
    const {email, password, firstName, lastName} = req.body;

    adminModel.create({
        email,
        password,
        firstName,
        lastName
    })

    res.json({
        message: "signup succeded"
    })

})

adminRouter.post("/signin", async function(req, res){
    const {email, password} = req.body;

    const admin = await adminModel.findOne({
        email: email,
        password: password
    })

    if(admin){
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);

        res.json({
            token: token
        })
    }

    else{
        res.status(403).json({
            message: "incorrect credentials"
        })
    }
})

adminRouter.post("/course", adminMiddleware, async function(req, res){
    const adminId = req.adminId;
    const {title, description, imageUrl, price} = req.body;

    const course = await courseModel.create({
        title, description, imageUrl, price, creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put("/course", adminMiddleware, async function(req, res){
    const adminId = req.adminId;
    const {title, description, imageUrl, price, courseId} = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId //because any creator cant change anathors creators course
    },
        {
        title, description, imageUrl, price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get("/course/bulk", adminMiddleware, async function(req, res){
    const adminId = req.userId;
    const courses = await courseModel.find({
        creatorId: adminId
    })

    res.json({
        message: "course updated"
    })

})

module.exports = {
    adminRouter: adminRouter
}