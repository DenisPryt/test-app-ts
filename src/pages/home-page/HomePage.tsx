import React from 'react';
import styled from 'styled-components';

import { useSubscriptionStorage } from '../../modules/subscription-storage';

import Subscripted from './components/subscribed';
import Welcome from './components/welcome';

const Container = styled.article`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 1rem auto;
  align-items: center;
  gap: 1rem;
`;

const HomePage = () => {
  const { item: subscription } = useSubscriptionStorage();

  return (
    <Container>
      {subscription ? (
        <Subscripted 
          organizationId={subscription.organizationId}
          usersIds={subscription.userIds}
        />
      ) : (
        <Welcome />
      )}
    </Container>
  );
};

export default HomePage;
