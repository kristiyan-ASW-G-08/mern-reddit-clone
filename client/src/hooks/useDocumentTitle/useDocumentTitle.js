import React, { useEffect } from 'react';

const useToggle = title => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
export default useToggle;
