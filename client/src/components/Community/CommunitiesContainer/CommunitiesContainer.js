import React,{Suspense,lazy} from 'react'
import Loader from '../../Loader'
const Communities = lazy(() => import('./Communities'));
const CommunitiesContainer = ({communities}) => {
    return (
        <>
        {communities ? (
          <Suspense fallback={<Loader />}>
            <div className="communities-container" >
            <Communities communities={communities} />
            <Communities communities={communities} />
            <Communities communities={communities} />
            <Communities communities={communities} />
            <Communities communities={communities} />
            </div>
          </Suspense>
        ) : (
          <h1>No Communities</h1>
        )}
        </>
    )
}
export default CommunitiesContainer 