// implement your posts router here

const express = require('express')
const router = express.Router();
const Posts = require('./posts-model');

// | 1 | GET    | /api/posts - Returns **an array of all the post objects** contained in the database        

router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: 'The posts information could not be retrieved'
        })    
    })
})

// | 2 | GET    | /api/posts/:id - Returns **the post object with the specified id**                 

router.get('/:id', (req, res) => {
    const { id } = req.params
    Posts.findById(id)
    .then(post => {
        if (post){
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'The post information could not be retrieved'
        })
    })
})
                                                           
// | 3 | POST   | /api/posts - Creates a post using the information sent inside the request body and returns **the newly created post object**  

router.post('/', (req, res) => {

    const { title, contents } = req.body
    if (!title || !contents) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
    } else {

        Posts.insert(req.body)
        .then( ({ id }) => {
        return Posts.findById(id) 
        })
        .then(post => {
            res.status(201).json(post)
        })
        .catch( err => {
            res.status(500).json({
                message: 'There was an error while saving the post to the database',
        })
    })
    }

})

// | 4 | PUT    | /api/posts/:id - Updates the post with the specified id using data from the request body and **returns the modified document**, not the original

router.put('/:id', (req, res) => {

    const { title, contents } = req.body
    if (!title || !contents) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
    } else {
        Posts.findById(req.params.id)
        .then(post => {
            if (!post) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            } else {
                return Posts.update(req.params.id, req.body)
            }
        })
        .then( data => {
            if (data) {
                return Posts.findById(req.params.id)
            }
        })
        .then(data => {
            if (data) {
                res.json(data)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'The post information could not be modified'
            })
        })
    }

})

// | 5 | DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**                                                 

router.delete('/:id', async (req, res) => {

    try {
        const { id } = req.params
        console.log(id)
        const post = await Posts.findById(req.params.id)
        console.log(post)
        if(!post) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        } else {
            await Posts.remove(req.params.id)
            res.status(200).json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The post could not be removed',
            stack: err.stack,
        })
    }
})

// | 6 | GET    | /api/posts/:id/comments | Returns an **array of all the comment objects** associated with the post with the specified id    

router.get('/:id/comments', async (req, res) => {

    try {
        const post = await Posts.findById(req.params.id)
        if (!post) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        } else {
            const message = await Posts.findPostComments(req.params.id)
            res.status(201).json(message)
        }

    } catch (err) {
        res.status(500).json({
            message: 'The comments information could not be retrieved'
        })
    } 
})

module.exports = router;