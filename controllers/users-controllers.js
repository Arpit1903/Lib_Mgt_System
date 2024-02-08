const {UserModel, BookModel} = require("../models/index");
const IssuedBook = require("../DTOs/book-dto");

exports.getAllUsers = async(req, res) => {
    const users = await UserModel.find();

    if(users.length === 0){
        return res.status(404).json({
            success: false,
            message: "No users found!!"
        })
    } 

    res.status(200).json({
        success: true,
        data: users 
    })
}

exports.getUserById = async(req, res) => {
    const {id} = req.params;

    const user = await UserModel.findById(id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found!"
        })
    }

    return res.status(200).json({
        success: true,
        data: user
    })
}

exports.updateUserById = async(req, res) => {
    const {id} = req.params;
    const {user} = req.body;

    const updatedUser = await UserModel.findOneAndUpdate({_id: id}, {$set: {...user}}, {new: true});

    return res.status(200).json({
        success: true,
        message: "updated the user info!",
        data: updatedUser
    })
}

exports.deleteUserById = async(req, res) => {
    const {id} = req.params;
    const {user} = await UserModel.deleteOne({_id: id});

    if(!user){
        return res.status(404).json({
            success: false,
            message: "user doesn't exist!!"
        })
    }

    return res.status(200).json({
        success: true,
        message: "user deleted!"
    })
}

exports.createNewUser = async(req, res) => {
    const { data } = req.body;

    await UserModel.create({
        "name" : data.name, 
        "surname" : data.surname, 
        "email" : data.email, 
        "issuedBook" : data.issuedBook, 
        "issuedDate" : data.issuedDate, 
        "returnDate" : data.returnDate, 
        "subscriptionType" : data.subscriptionType, 
        "subscriptionDate" : data.subscriptionDate
    });       
    const allUsers = await UserModel.find();
 
    return res.status(201).json({
        success: true,
        message: "new user added!",
        data: allUsers
    }) 
}

exports.getSubscriptionDetailsById = async (req, res) => {
    const { id } = req.params;
  
    const user = await UserModel.findById(id);
  
    if (!user){
        return res.status(404).json({ 
            success: false, 
            message: "User not found" 
        });
    }
  
    const getDateInDays = (data = "") => {
      let date;
      if (data === "") {
        // current data
        date = new Date();
      } else {
        // getting date on basics of variable
        date = new Date(data);
      }
      let days = Math.floor(date / (1000 * 60 * 60 * 24));
      return days;
    };
  
    const subscriptionType = (date) => {
      if (user.subscriptionType === "Basic") {
        date = date + 90;
      } else if (user.subscriptionType === "Standard") {
        date = date + 180;
      } else if (user.subscriptionType === "Premium") {
        date = date + 365;
      }
      return date;
    };
    // subscription calc here
    // Jan 1, 1970
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);
  
    const data = {
      ...user,
      subscriptionExpired: subscriptionExpiration < currentDate,
      daysLeftForExpiration:
        subscriptionExpiration <= currentDate
          ? 0
          : subscriptionExpiration - currentDate,
      fine:
        returnDate < currentDate
          ? subscriptionExpiration <= currentDate
            ? 200
            : 100
          : 0,
    };
    return res.status(200).json({ 
        success: true, 
        data: data 
    });
};