# Lib_Mgt_System
Book/Library Management System

## Routes

## /users
POST: create new user
GET: get all users info

## /users/{id}
GET: get a user by id
PUT: update a user by id
DELETE: delete a user by id (check if user still has an issued book) && (if there is any fine to be paid)

## /users/subscription-details/{id}
GET: get user subscription details by id
    >> Date of subscription 
    >> Valid through
    >> Pending Fines

## /books
GET: get all the books
POST: create new book entry

## /books/{id}
GET: get a book by id
PUT: update a book by id

## /books/issued
GET: get all issued books

## /books/issued/withFine
GET: get all issued books with their fines





## npm init
## npm i nodemon --save-dev
## npm run dev