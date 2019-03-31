import  {  oneOfType,shape,arrayOf,bool } from 'prop-types';
import postType from './postType'

const postsArrType = oneOfType([arrayOf(
    postType
  ), bool])


export default postsArrType