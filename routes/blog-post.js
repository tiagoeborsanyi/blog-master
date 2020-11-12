const express = require('express')
const router = express.Router();

router.get('/test', () => {
    // verifica se o usuario atenticado
}, (req, res) => {
    res.json({posts: 'posts ok'});
})

module.exports = router;