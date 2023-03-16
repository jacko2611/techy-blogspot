const { Post } =require ('../models');
const postData = 
[
  {
    title: "Is Bootstrap the right choice for my project?",
    content: "I've been reading some articles on Bootstrap and just want to know what people think about it.",
    user_id: 3
  },
  {
    title: "What is the difference between a framework and a library?",
    content: "Someone help! I'm confused about the difference between a framework and a library.",
    user_id: 1
  },
  {
    title: "How to survive bootcamp",
    content: "I'm a little nervous about starting bootcamp. I've heard it's really hard. Any tips?",
    user_id: 2
  },
]
 const seedPost = () => Post.bulkCreate(postData);

 module.exports = seedPost