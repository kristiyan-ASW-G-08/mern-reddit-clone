import React from 'react'
const Rule= ({title,description}) => {
    return (
        <li className="rules-list-rule">
        <details>
       <summary className="rules-list-title">{title}</summary>
        <p className="rules-list-description">{description}</p>
      </details> 
        </li>
    )
}
export default Rule