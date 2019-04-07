import React from 'react'
import RulesForm from './RulesForm/RulesForm'
import Toggle from '../../Toggle/Toggle'
const RulesPage = ({}) => {
    return (
        <Toggle>
        {({ on, toggle }) => (
          <>
            <div className="comment-form-container">
              {on ? (
                <RulesForm
                
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