import React, { useState,  createContext,} from 'react';

const Context = createContext();
const CommunityContext = props => {
  const [community, setCommunity] = useState(null);


  const setCurrentCommunity =currentCommunity => setCommunity(currentCommunity)
  return (
    <Context.Provider
      value={{
        community,
        setCurrentCommunity
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export const CommunityContextData = Context ;
export const CommunityContextConsumer = Context.Consumer
export default CommunityContext;
