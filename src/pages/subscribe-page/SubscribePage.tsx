import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { blueColor } from '../../styles/color';

import { Button } from '../../components/button';
import { Modal } from '../../components/modal';
import SubscribeForm from './components/subscribe-form/SubscribeForm';
import { useSubscriptionStorage } from '../../modules/subscription-storage';

const Container = styled.article`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SubscribePage = () => {
  const navigateTo = useNavigate();
  const { setItem: setSubscription } = useSubscriptionStorage();

  const [isOpen, setOpen] = useState(false);

  return (
    <Container>
      <Button variant='contained' color={blueColor} onClick={() => setOpen(true)}>Subscribe</Button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <SubscribeForm onSubmit={({selectedOrganizationId, selectedUserIds}) => {
          setSubscription({
            organizationId: selectedOrganizationId,
            userIds: Array.from(selectedUserIds.keys()),
          });
          setOpen(false);
          navigateTo('/')
        }} />
      </Modal>
    </Container>
  );
};

export default SubscribePage;
