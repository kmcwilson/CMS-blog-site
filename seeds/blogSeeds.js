const { Blog } = require ('../models');

const blogPosts= [
    {
        title: 'The importance of M.V.C', 
        post: `Model, View and Controller are very important for development and projects.
        This format helps to organize your code into a more readable document.`, 
        user_id: 1
    }, 
    {
        title: 'Object Relational Mapping', 
        post: `I have realy enjoyed learnign ORM. It helps to solidify your knowledge of SQL queries.`, 
        user_id: 2
    }
];

const blogSeed = () => Blog.bulkCreate(blogPosts);

module.exports= blogSeed;


