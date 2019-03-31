import  {  oneOfType,shape,arrayOf,bool } from 'prop-types';
import commentType from './commentType'

const commentsArrType = oneOfType([arrayOf(
    commentType
  ), bool])


export default commentsArrType