import React from 'react'
const Rule= ({rule,setEditRule,toggle,deleteRule}) => {
  const {ruleId,title,description} = rule
    return (
        <li className="rules-list-rule">
        <details>
       <summary className="rules-list-title">{title}</summary>
        <p className="rules-list-description">{description}</p>
        <div className="buttons-container">
        <button onClick={() => deleteRule(ruleId)} className="button">Delete</button>
        <button onClick={() => {setEditRule(rule);toggle()}} className="button">Edit</button>
        </div>
      </details> 
        </li>
    )
}
export default Rule