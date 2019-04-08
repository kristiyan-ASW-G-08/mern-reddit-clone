const  Post  = require('../models/post')
const pagination = async (req, type, findArg) => {
  const { page } = req.query;
  const currentPage = page || 1;
  const postPerPage = 5;
  let posts;
  switch (type) {
    case 'community':
    posts = await Post.find({ communityName: findArg }).countDocuments().find().skip((currentPage - 1) * postPerPage).limit(postPerPage);
      break;
    case 'general':
    posts = await Post.find().countDocuments().find().skip((currentPage - 1) * postPerPage).limit(postPerPage);
      break;
      case 'userPosts':
      posts = await Post.find({authorId:findArg}).countDocuments().find().skip((currentPage - 1) * postPerPage).limit(postPerPage);
        break;
  }
    const totalDocuments = await Post.countDocuments() 
    const totalDocumentsAfterPagination = totalDocuments - (currentPage * postPerPage)
    const documentCount = totalDocumentsAfterPagination < 0 ? 0 :totalDocumentsAfterPagination

    return {
        posts,postsCount:documentCount
    }
};
module.exports = pagination;


