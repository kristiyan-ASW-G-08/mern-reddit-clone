import React,{Suspense,lazy} from 'react'
import Loader from '../../Loader'
import PropTypes from 'prop-types';
import communitiesArrType from '../../PropTypes/communitiesArrType'
const Communities = lazy(() => import('./Communities'));
const CommunitiesContainer = ({communities}) => {
    return (
        <>
        {communities ? (
          <Suspense fallback={<Loader />}>
            <div className="communities-container" >
            <Communities communities={communities} />

            </div>
          </Suspense>
        ) : (
          <h1>No Communities</h1>
        )}
        </>
    )
}
Communities.propTypes = {
  communities: communitiesArrType.isRequired,
};
export default CommunitiesContainer 