const { User } =require ('../models');
const bcrypt = require('bcrypt');
const userData = [
    {
        id: 1,
        name: "Jackson",
        email: "jacksonkent70@gmail.com",
        password: bcrypt.hashSync("password12345", 10)
    },
    {
        id: 2,
        name: "Sal",
        email: "sal@hotmail.com",
        password: bcrypt.hashSync("password56789", 10)
    },
    {
        id: 3,
        name: "Lernantino",
        email: "lernantino@gmail.com",
        password: bcrypt.hashSync("password00000", 10)
    },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers