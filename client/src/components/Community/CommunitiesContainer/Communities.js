import React, { Fragment,lazy } from 'react';
import PropTypes from 'prop-types';
import CommunityPreview from './CommunityPreview'
import communitiesArrType from '../../PropTypes/communitiesArrType'
const Communities = ({ communities }) => {
  return (
    <>
      {communities.map(community => {
        return (
          <CommunityPreview
            key={community._id}
            community={community}
          />
        );
      })}
    </>
  );
};
Communities.propTypes = {
  communities: communitiesArrType.isRequired,
};
export default Communities;
