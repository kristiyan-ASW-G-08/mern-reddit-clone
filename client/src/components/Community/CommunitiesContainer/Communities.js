import React, { Fragment,lazy } from 'react';
const CommunityPreview = lazy(() => import('./CommunityPreview'))
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
export default Communities;
