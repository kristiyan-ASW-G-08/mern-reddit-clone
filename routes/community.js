const express = require('express');
const { body } = require('express-validator/check');
const Community  = require('../models/community')
const communityController = require('../controllers/community');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
router.post(
  '/create-community',
  isAuth,
  [
    body('name','The name of your community must be minimum 3 and maximum 21 characters long!')
      .trim()
      .isLength({ min: 3,max:21 })
      .escape()
      .custom((name, { req }) => {
        return Community.findOne({ name }).then(CommunityDoc => {
          if (CommunityDoc) {
            return Promise.reject('Community Name is already taken');
          }
        });
      }),
    body('description','The description of your community must be minimum 10 and maximum 100 characters long!')
      .trim()
      .isLength({ min: 3 })
      .escape()
      .trim()
  ],
  communityController.createCommunity
);

router.get('/community/:communityName',communityController.getCommunity);

router.get('/posts/:communityId',communityController.getPosts)

router.post('/report-spam/:postId',communityController.reportSpam)
module.exports = router;