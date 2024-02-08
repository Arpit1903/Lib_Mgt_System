const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

// const BookModel = require("../models/books-models");
// const UserModel = require("../models/users-models");
const {UserModel, BookModel} = require("../models/index");

const {getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById} = require("../controllers/books-controllers");

const router = express.Router();


/*
Route: /
Method: get
Desc: get all books details
Access: public
Parameters: none
*/

/*  ******getting data from books.json
router.get("/", (req, res)=> {
    res.status(200).json({
        success: true,
        data: books
    })
})
*/

router.get("/", getAllBooks); //********getting data from the DATABASE


/*
Route: /
Method: post
Desc: create new book
Access: public
Parameters: none
*/

/*
router.post("/", (req, res)=>{
    const data = req.body;
    if(!data){
        return res.status(400).json({
            success: false,
            message: "no data to add a book"
        })
    }

    const book = books.find((each)=> each.id === data.id);
    if(book){
        return res.status(404).json({
            success: false,
            message: "book already exists!!"
        })
    }

    const allBooks = {...books, data};

    return res.status(201).json({
        success: true,
        message: "new book added!",
        data: allBooks
    })
})
*/
router.post("/", addNewBook);


/*
Route: /issued
Method: get
Desc: get issued books
Access: public
Parameters: none
*/
/*
router.get("/issued", (req, res)=>{
    const usersWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook) return each;
    })

    const issuedBooks = [];

    usersWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    })

    if(issuedBooks.length === 0){
        return res.status(404).json({
            success: false,
            message: "No user has issued any book!!"
        })
    }

    return res.status(200).json({
        success: true,
        message: "all issued books found!",
        data: issuedBooks
    })
})
*/
router.get("/issued", getAllIssuedBooks);


/*
Route: /:id
Method: get
Desc: get books by their id
Access: public
Parameters: id
*/

/*
router.get("/:id", (req, res)=> {
    const {id} = req.params;
    const book = books.find((each)=> each.id === id);

    if(!book){
        res.status(404).json({
            success: false,
            message: "book doesn't exist!!"
        })
    }

    res.status(200).json({
        success: true,
        message: "book found!",
        data: book
    })
})
*/
router.get("/:id", getSingleBookById);



/*
Route: /:id
Method: put
Desc: update a book by their id
Access: public
Parameters: id
*/

/*
router.put("/:id", (req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each)=> each.id === id);

    if(!book){
        res.status(400).json({
            success: false,
            message: "book not found for this id!!"
        })
    }

    const updatedBookData = books.map((each)=> {
        if(each.id===id){
            return {
                ...each,
                ...data
            };
        }
        return each;
    })

    res.status(200).json({
        success: true,
        message: "book updated!",
        data: updatedBookData
    })
})
*/
router.put("/:id", updateBookById);


module.exports = router;