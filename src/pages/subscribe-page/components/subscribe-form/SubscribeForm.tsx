import React, { FormEvent, FormEventHandler, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { blueColor } from '../../../../styles/color';

import { Button } from '../../../../components/button';
import { UsersSelect } from '../../../../components/users-select/UsersSelect';
import { ISelectChangeEvent } from '../../../../components/users-select/components/SelectUsersListBox';
import { OrganizationsSelect } from '../../../../components/organizations-select/OrganizationsSelect';

import { USERS } from '../../../../store/users/users';
import { ORGANIZATIONS } from '../../../../store/organizations/organizations';

const StyledForm = styled.form`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const StyledUsersSelect = styled(UsersSelect)`
  width: 40%;
`;

const StyledOrganizationsSelect = styled(OrganizationsSelect)`
  width: 40%;
`;

const StyledSubmitButton = styled(Button)`
  align-self: end;
  margin-top: auto;
`;

const EmptyStringSet = new Set<string>();

export interface ISubscribeFormValues {
  selectedUserIds: Set<string>;
  selectedOrganizationId: string;
}

interface ISubscribeFormProps {
  onSubmit?: (values: ISubscribeFormValues, event: FormEvent<HTMLFormElement>) => void;
}

const SubscribeForm = ({onSubmit}: ISubscribeFormProps) => {
  const users = useMemo(() => USERS, []); // useSelector(selectUsers);
  const [selectedUserIds, setSelectedUserIds] = useState(EmptyStringSet);

  const organizations = useMemo(() => ORGANIZATIONS, []); // useSelector(selectOrganization);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string>();

  const isValid = useMemo(
    () => selectedUserIds.size > 0 && !!selectedOrganizationId,
    [selectedUserIds, selectedOrganizationId]
  );

  const handleSelectChange = useCallback(({selectedUsers}: ISelectChangeEvent) => {
    setSelectedUserIds(selectedUsers);
  }, []);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();

      if (!isValid) {
        return;
      }

      if (onSubmit) {
        onSubmit({selectedUserIds, selectedOrganizationId: selectedOrganizationId ?? ''}, e);
      }
    },
    [selectedUserIds, isValid, onSubmit]
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledUsersSelect
        users={users}
        selectedUsers={selectedUserIds}
        onSelectChange={handleSelectChange}
      />
      <StyledOrganizationsSelect
        organizations={organizations}
        selectedOrganizationId={selectedOrganizationId}
        onSelectChange={({id}) => setSelectedOrganizationId(id)}
      />
      <StyledSubmitButton variant='contained' color={blueColor} disabled={!isValid} type='submit'>Submit</StyledSubmitButton>
    </StyledForm>
  );
};

export default SubscribeForm;
