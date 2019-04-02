import React,{Suspense,lazy} from 'react'
import Loader from '../../Loader'
import PropTypes from 'prop-types';
import communitiesArrType from '../../PropTypes/communitiesArrType'
const Communities = lazy(() => import('./Communities/Communities'));
const CommunitiesContainer = ({communities}) => {
    return (
        <>
        {communities ? (
          <Suspense fallback={<Loader />}>
            <Communities communities={communities} />
          </Suspense>
        ) : (
          <h1>No Communities</h1>
        )}
        </>
    )
}
CommunitiesContainer.propTypes = {
  communities: communitiesArrType.isRequired,
};
export default CommunitiesContainer 