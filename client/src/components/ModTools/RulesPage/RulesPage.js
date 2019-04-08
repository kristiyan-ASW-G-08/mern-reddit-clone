import React,{lazy,Suspense,useEffect,useState} from 'react'
import Loader from '../../Loader'
import RulesForm from './RulesForm/RulesForm'
import Toggle from '../../Toggle/Toggle'
import getData from '../../../util/getData'
const RulesContainer = lazy(() => import('./RulesContainer/RulesContainer'));
const RulesPage = ({communityId,communityName}) => {
  const [rules,setRules] = useState(null)
  useEffect(() => {
    const apiUrl = `http://localhost:8080/community/rules/get/${communityId}`;
    getData(apiUrl).then(data => {
      if (data.rules) {
        console.log(data)
        setRules(data.rules);
      }
    });
  },[])
    return (
      <>
       {rules && rules.length > 0 ? (
        <Suspense fallback={<Loader />}>
            <RulesContainer rules={rules} communityName={communityName} /> 
        </Suspense>
      ) : (
        <h1>No Rules</h1>
      )}
        <Toggle>
        {({ on, toggle }) => (
          <>
            <div className="comment-form-container">
              {on ? (
                <RulesForm
                communityId={communityId}
                />
              ) : (
                ''
              )}
              <button
                className="button button-toggle comment-button"
                onClick={toggle}
              >
                {on ? 'Close' : 'Add New Rule'}
              </button>
            </div>
          </>
        )}
      </Toggle>
      </>
    )
}
export default RulesPage 