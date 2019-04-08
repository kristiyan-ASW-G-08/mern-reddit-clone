import React from 'react'
import Rule from './Rule';
const RulesContainer= ({rules,communityName}) => {
    
    return (
        <div className="rules-container">
        <div className="rules-list-container">
        <p className="rules-list-container-header">C/{communityName.toUpperCase()} RULES</p>
        <ol className="rules-list">
        {rules.map(rule =><Rule key={rule._id} title={rule.title} description={rule.description}/>)}
        </ol></div>
       
        </div>
    )
}
export default RulesContainer