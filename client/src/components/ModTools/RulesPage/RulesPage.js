import React,{lazy,Suspense,useEffect,useState} from 'react'
import Loader from '../../Loader'
import RulesForm from './RulesForm/RulesForm'
import Toggle from '../../Toggle/Toggle'
import getData from '../../../util/getData'
import deleteData from '../../../util/deleteData'
import useAuthContext from '../../../hooks/useAuthContext/useAuthContext'
import useModalContext from '../../../hooks/useModalContext/useModalContext'
const RulesContainer = lazy(() => import('./RulesContainer/RulesContainer'));
const RulesPage = ({communityId,communityName}) => {
  const [rules,setRules] = useState(null)
  const [editRule, setEditRule] = useState(false);
  const {isAuth,token} = useAuthContext()
  const {toggleModalReducer} = useModalContext()
  useEffect(() => {
    const apiUrl = `http://localhost:8080/community/rules/get/${communityId}`;
    getData(apiUrl).then(data => {
      if (data.rules) {
        console.log(data)
        setRules(data.rules);
      }
    });
  },[])

  const setNewRule = rule => {
    const editedRules = [...rules, rule];
    setRules(editedRules);
  };
  const editRules = editedRule => {
    const editedRules = rules.filter(
      rule => rule._id !== editedRule._id
    );
    setRules([...editedRules, editedRule]);
  };
  const deleteRule = async ruleId => {
    const apiUrl = `http://localhost:8080/community/rule/delete/${ruleId}`
    const responseData = await deleteData(apiUrl,token)
    if(responseData.msg = 'Deleted'){
      const editedRules = rules.filter(
        rule => rule._id !== ruleId
      );
      setRules(editedRules)
      toggleModalReducer({on:true,message:'Rule deleted successfully!'})
    }else toggleModalReducer({on:true,message:'Something went wrong!Try again!'})
  }
    return (

        <Toggle>
        {({ on, toggle }) => (
          <>
          {rules && rules.length > 0 ? (
        <Suspense fallback={<Loader />}> 
            <RulesContainer rules={rules} communityName={communityName} deleteRule={deleteRule}  setEditRule={setEditRule} toggle={toggle}/> 
        </Suspense>
      ) : (
        <h1>No Rules</h1>
      )}
            <div className="comment-form-container">
              {on ? (
                <RulesForm
                toggle={toggle}
                communityId={communityId}
                editRule={editRule}
                setNewRule={setNewRule}
                editRules={editRules}
                setEditRule={setEditRule}
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
    )
}
export default RulesPage 