const express = require("express");
const {users} = require("../data/users.json");

const {UserModel, BookModel} = require("../models/index");

const {getAllUsers, getUserById, updateUserById, deleteUserById, createNewUser} = require("../controllers/users-controllers");

const router = express.Router();


/*
Route: /
Method: get
Desc: get all users
Access: public
Parameters: none
*/
// http://localhost:8081/users

/*
router.get("/", (req, res)=>{
    res.status(200).json({
        success: true,
        data: users 
    })
})
*/
router.get("/", getAllUsers);

/*
Route: /users
Method: post
Desc: post new user details
Access: public
Parameters: none
*/

/*
router.post("/", (req, res)=>{
    const {id, name, surname, email, issuedBook, issuedDate, returnDate, subscriptionType, subscriptionDate} = req.body;

    const user = users.find((each) => each.id === id);

    if(user){
        res.status(404).json({
            success: false,
            message: "user already exists!!"
        })
    }
    users.push({
        id, 
        name,
        surname,
        email,
        issuedBook,
        issuedDate,
        returnDate,
        subscriptionType,
        subscriptionDate
    })

    res.status(201).json({
        success: true,
        message: "new user updated!", 
        data: users
    })
})
*/
router.post("/", createNewUser);


/*
Route: /:id
Method: get
Desc: get single user by their id
Access: public
Parameters: id
*/

/*
router.get("/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find((each)=>each.id===id);
    if(!user){
        res.status(404).json({
            success: false,
            message: "This person doesn't exist!!"
        })
    }
    res.status(200).json({
        success: true,
        message: "user found!",
        data: user
    })
})
*/
router.get("/:id", getUserById);

/*
Route: /:id
Method: put
Desc: update a user by their id
Access: public
Parameters: id
*/

/*
router.put("/:id", (req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each)=> each.id === id);
    if(!user){
        res.status(404).json({
            success: false,
            message: "user already exists!!"
        })
    }
    
    const updateUserData = users.map((each) => {
        if(each.id === id){
            return {
                ...each, 
                ...data
            }
        }
        return each;
    })
    res.status(200).json({
        success: true,
        message: "user data updated!",
        data: updateUserData
    })
})
*/
router.put("/:id", updateUserById);

/*
Route: /:id
Method: delete
Desc: delete a user by their id
Access: public
Parameters: id
*/

/*
router.delete("/:id", (req, res) =>{
    const {id} = req.params;
    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "user doesn't exist!!"
        })
    }

    const idx = users.indexOf(user);
    users.splice(idx, 1);

    return res.status(200).json({
        success: true,
        message: "user deleted successfully!",
        data: users
    })
})
*/
router.delete("/:id", deleteUserById)

/*
Route: /subscription-details/:id
Method: get
Desc: get a user's subscription details(date, valid till, pending fines) by their id
Access: public
Parameters: id
*/
router.get("/subscription-details/:id", (req, res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id===id);
    if(!user){
        res.status(404).json({
            success: false,
            message: "user not found!!"
        })
    }

    const getDateInDays = (data = "") =>{
        let date;
        if(data === ""){
            date = new Date();
        }else{
            date = new Date(data);
        }

        let days = Math.floor(date / (1000*60*60*24));
        return days;
    }

    const subscriptionType = (date) => {
        if(user.subscriptionType == "Basic"){
            date += 90;
        }else if(user.subscriptionType == "Standard"){
            date += 180;
        }else if(user.subscriptionType == "Premium"){
            date += 365;
        }

        return date;
    }

    let returnDate = getDateInDays(user.returnDate); //no. of days is calculated by keeing --1 jan 1970 UTC-- as a base
    let currDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,

        isSubscriptionExpired : subscriptionExpiration <= currDate,

        subscriptionDaysLeft : subscriptionExpiration <= currDate ? 0 : (subscriptionExpiration-currDate),

        fine : returnDate < currDate 
            ? (subscriptionExpiration <= currDate) 
                ? 100 
                : 50 
            : 0
    }

    return res.status(200).json({
        success: true,
        message: "subscription details of the user are fetched!",
        data
    })

})



module.exports = router;