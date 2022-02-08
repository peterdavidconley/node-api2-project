// implement your posts router here

const express = require('express')
const router = express.Router();
const Posts = require('./posts-model');

// | 1 | GET    | /api/posts - Returns **an array of all the post objects** contained in the database        

router.get('/', (req, res) => {

})

// | 2 | GET    | /api/posts/:id - Returns **the post object with the specified id**                 

router.get('/', (req, res) => {

})
                                                           
// | 3 | POST   | /api/posts - Creates a post using the information sent inside the request body and returns **the newly created post object**  

router.post('/', (req, res) => {

})

// | 4 | PUT    | /api/posts/:id - Updates the post with the specified id using data from the request body and **returns the modified document**, not the original

router.put('/', (req, res) => {

})

// | 5 | DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**                                                 

router.delete('/', (req, res) => {

})

// | 6 | GET    | /api/posts/:id/comments | Returns an **array of all the comment objects** associated with the post with the specified id    

router.get('/', (req, res) => {

})

module.exports = router;