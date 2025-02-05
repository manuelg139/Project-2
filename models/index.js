const Users = require('./Users');
const Projects = require('./Projects');
const Comments = require('./Comments');

Users.hasMany(Projects, {
    foreignKey: 'users_id',
    onDelete: 'CASCADE'
});

Projects.belongsTo(Users, {
    foreignKey: 'users_id'
});

Comments.belongsTo(Users, {
    foreignKey: 'users_id',
});

Comments.belongsTo(Projects, {
    foreignKey: 'projects_id'
});

Users.hasMany (Comments, {
    foreignKey: 'users_id',
    onDelete: 'CASCADE'
});

Projects.hasMany(Comments, {
    foreignKey: 'projects_id',
    onDelete: 'CASCADE'
});


module.exports = {Users, Projects, Comments};