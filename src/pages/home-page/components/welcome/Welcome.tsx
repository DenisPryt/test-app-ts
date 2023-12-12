import React from 'react';
import { useNavigate } from 'react-router-dom';
import { blueColor } from '../../../../styles/color';

import { Button } from '../../../../components/button';
import { Label } from '../../../../components/label';


const Welcome = () => {
  const navigateTo = useNavigate();

  return (
    <>
      <Label as='h1'>Welcome to the cycode!</Label>
      {/* use link instead of button here */}
      <Button variant='contained' color={blueColor} onClick={() => navigateTo('/subscribe')}>Go to subscribe page</Button>
    </>
  );
};

export default Welcome;
