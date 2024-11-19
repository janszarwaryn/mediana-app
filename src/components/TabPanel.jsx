import React from 'react';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index} className={value === index ? 'block' : 'hidden'}>
      {children}
    </div>
  );
}

export default TabPanel;