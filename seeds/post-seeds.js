const { Post } = require('../models');

const postData = [
    {
        title: "title",
        post_content: "content here",
        user_id: 3
    },
  
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;