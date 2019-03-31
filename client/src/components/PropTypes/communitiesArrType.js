import  {  oneOfType,shape,arrayOf,bool } from 'prop-types';
import communityType from './communityType'

const communitiesArrType = oneOfType([arrayOf(
    communityType
  ), bool])


export default communitiesArrType