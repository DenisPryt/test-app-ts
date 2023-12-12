import React from 'react';
import { Label } from '../../../../components/label';

import { isTruly } from '../../../../helpers/is-truly';

import { ORGANIZATIONS } from '../../../../store/organizations/organizations';
import { USERS } from '../../../../store/users/users';
import { fullName } from '../../../../store/users/helpers';

interface ISubscriptedProps {
  usersIds: string[];
  organizationId: string;
}

const Subscripted = ({usersIds, organizationId}: ISubscriptedProps) => {
  // no memoization because there are no renders
  const organization = ORGANIZATIONS.find(({id}) => id === organizationId);
  const selectedUsers = usersIds.map(usersId => USERS.find(({id}) => id === usersId)).filter(isTruly);
  
  const joinedUsers = selectedUsers.map(({firstName, lastName}) => fullName(firstName, lastName)).join(', ');
  return (
    <>
      <Label as='h1'>Subscribed!</Label>
      <Label as='h2'>Organization: {organization ? organization.name : ''}</Label>
      <Label as='h4'>Users: {joinedUsers}</Label>
    </>
  );
};

export default Subscripted;
