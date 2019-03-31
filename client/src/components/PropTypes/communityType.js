import { shape, number, string, oneOf } from 'prop-types';

 const communityType = shape({
  name: string.isRequired,
  icon: string.isRequired,
  description: string.isRequired,
  creator: string.isRequired,
  subscribers: number.isRequired,
  _id:string.isRequired,
});

export default communityType
