const express = require('express');
const { body } = require('express-validator/check');
const Community = require('../models/community');
const Rule = require('../models/rule');
const communityController = require('../controllers/community');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
router.post(
  '/post',
  isAuth,
  [
    body(
      'name',
      'The name of your community must be minimum 3 and maximum 21 characters long!'
    )
      .trim()
      .isLength({ min: 3, max: 21 })
      .escape()
      .custom((name, { req }) => {
        return Community.findOne({ name }).then(CommunityDoc => {
          if (CommunityDoc) {
            return Promise.reject('Community Name is already taken');
          }
        });
      }),
    body(
      'description',
      'The description of your community must be minimum 10 and maximum 100 characters long!'
    )
      .trim()
      .isLength({ min: 3 })
      .escape()
      .trim()
  ],
  communityController.createCommunity
);

router.post(
  '/edit/:communityName',
  isAuth,
  [
    body(
      'name',
      'The name of your community must be minimum 3 and maximum 21 characters long!'
    )
      .trim()
      .isLength({ min: 3, max: 21 })
      .escape()
      .custom((name, { req }) => {
        return Community.findOne({ name }).then(CommunityDoc => {
          if (CommunityDoc) {
            return Promise.reject('Community Name is already taken');
          }
        });
      }),
    body(
      'description',
      'The description of your community must be minimum 10 and maximum 100 characters long!'
    )
      .trim()
      .isLength({ min: 3 })
      .escape()
      .trim()
  ],
  communityController.createCommunity
);

router.post('/icon/:communityName', communityController.changeIcon);

router.get('/get/:communityName', communityController.getCommunity);

router.get('/posts/:communityName', communityController.getPosts);

router.post('/report/:postId', isAuth, communityController.postReport);

router.get('/reports/:communityId', isAuth, communityController.getReports);
router.delete('/report/:reportId', isAuth, communityController.deleteReportPost);
router.post('/ban/:communityId',isAuth,communityController.banHandler)
const ruleValidationArr = [
  body(
    'title',
    'Title must be 10 between 100 characters long!'
  )
    .trim()
    .isLength({ min: 10, max: 100 })
    .escape(),
    body(
      'description',
      'Description must be 10 between 300 characters long!'
    )
      .trim()
      .isLength({ min: 10, max: 300 })
      .escape()
]
router.post('/rule/post/:communityId',ruleValidationArr,isAuth,communityController.postRule)
router.post('/rule/edit/:ruleId',ruleValidationArr,isAuth,communityController.editRule)
router.delete('/rule/delete/:ruleId',isAuth,communityController.deleteRule)
router.get('/rules/get/:communityId',communityController.getRules)
module.exports = router;
