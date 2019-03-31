import { shape, number, string, oneOf } from 'prop-types';

 const postType = shape({
  title: string.isRequired,
  author: string.isRequired,
  community: string.isRequired,
  communityName: string.isRequired,
  comments: number.isRequired,
  upvotes: number.isRequired,
  downvotes: number.isRequired,
  _id:string.isRequired,
});

export default postType