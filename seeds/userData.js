const { Users } = require('../models');

const userdata = [
{
    name: 'Kyle',
    username: 'KyleTheDestroyer',
    email: 'kyle@mail.com'
},
{
    name: 'Manuel',
    username: 'MannyMoon',
    email: 'manuel@mail.com'
},
{
    name: 'Manorath',
    username: 'daddyRath',
    email: 'manorath@mail.com'
},
{
    name: 'Dora',
    username: 'DoraStark',
    email: 'dora@mail.com'
},
];

const seedUser = () => Users.bulkCreate(userdata);

module.exports = seedUser;
