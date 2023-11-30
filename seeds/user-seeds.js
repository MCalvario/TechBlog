const { User } = require('../models');

const userData = [
    {
        username: "John_Doe",
        github: "JDoe",
        email: "j_doe@yahoo.com",
        password: "pswd1!"
    },
    
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;