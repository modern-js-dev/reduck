import React, { useEffect, useState } from 'react';
let csr = false;
export const NoSSR = props => {
  const [isMounted, setMounted] = useState(csr);
  useEffect(() => {
    csr = true;
    setMounted(true);
  });
  const {
    children
  } = props;
  return /*#__PURE__*/React.createElement(React.Fragment, null, isMounted ? children : null);
};