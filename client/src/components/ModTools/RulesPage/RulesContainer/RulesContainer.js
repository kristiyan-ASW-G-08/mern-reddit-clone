import React from 'react'
import Rule from './Rule';
const RulesContainer= ({rules,communityName,setEditRule,deleteRule,toggle}) => {
    
    return (
        <div className="rules-container">
        <div className="rules-list-container">
        <p className="rules-list-container-header">C/{communityName.toUpperCase()} RULES</p>
        <ol className="rules-list">
        {rules.map(rule =><Rule key={rule._id} rule={rule} deleteRule={deleteRule} setEditRule={setEditRule} toggle={toggle} />)}
        </ol></div>

        </div>
    )
}
export default RulesContainer