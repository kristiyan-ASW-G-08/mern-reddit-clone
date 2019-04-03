const  Post  = require('../models/post')
const pagination = async (req, type, findArg) => {
  const { page } = req.query;
  const currentPage = page || 1;
  const postPerPage = 5;
  let posts;
  if (type === 'community') {
    posts = await Post.find({ communityId: findArg }).countDocuments().find().skip((currentPage - 1) * postPerPage).limit(postPerPage);
  } else if (type === 'general') {
    posts = await Post.find().countDocuments().find().skip((currentPage - 1) * postPerPage).limit(postPerPage);
  }
    const totalDocuments = await Post.countDocuments() 
    const totalDocumentsAfterPagination = totalDocuments - (currentPage * postPerPage)
    const documentCount = totalDocumentsAfterPagination < 0 ? 0 :totalDocumentsAfterPagination

    return {
        posts,postsCount:documentCount
    }
};
module.exports = pagination;
