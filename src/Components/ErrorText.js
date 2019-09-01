import React from 'react';

const MyErrorText = props => {
  const { children } = props;

  return (
    <p style={{ marginTop: 10, fontSize: 10, color: 'red' }}>{children}</p>
  );
};

export default MyErrorText;
