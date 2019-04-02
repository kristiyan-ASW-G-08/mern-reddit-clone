import React, { Fragment,lazy } from 'react';
import PropTypes from 'prop-types';
import CommunityPreview from '../CommunityPreview/CommunityPreview'
import communitiesArrType from '../../../PropTypes/communitiesArrType'
const Communities = ({ communities }) => {
  return (
    <>
     <div data-testid="communities" className="communities-container">
      {communities.map(community => {
        return (
          <CommunityPreview
            key={community._id}
            community={community}
          />
        );
      })}
      </div>
    </>
  );
};
Communities.propTypes = {
  communities: communitiesArrType.isRequired,
};
export default Communities;
