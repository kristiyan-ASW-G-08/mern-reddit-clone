import { shape, number, string, oneOf } from 'prop-types';

 const commentType = shape({
    creationDate :string.isRequired,
    communityId :string.isRequired,
    authorId :string.isRequired,
    author :string.isRequired,
    postId :string.isRequired,
    postTitle :string.isRequired,
    content :string.isRequired,
    upvotes :number.isRequired,
    downvotes :number.isRequired,
    comments:number.isRequired
});

export default commentType

