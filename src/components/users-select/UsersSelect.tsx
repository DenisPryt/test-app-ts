import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { expandHeight } from "../../styles/keyframes/expand-height";

import { fullName } from "../../store/users/helpers";
import { IUser } from '../../store/users/users';

import { SelectUsersListBox, ISelectChangeEvent } from "./components/SelectUsersListBox";

import { Label } from "../label";
import { Dropdown } from "../dropdown/Dropdown";

const StyledDropdown = styled(Dropdown)`
  min-width: 13rem;
`;

const StyledSelectUsersListBox = styled(SelectUsersListBox)`
  max-height: 25rem;

  animation: ${expandHeight} 0.2s ease-out;
`;


const containsNameFilter = (filterText: string) => ({firstName, lastName} : IUser) => (
  firstName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) ||
  lastName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
);

const PLACEHOLDER = 'select users';

interface IUsersSelectProps {
  users: IUser[];
  selectedUsers: Set<string>;
  onSelectChange: (event: ISelectChangeEvent) => void;
  className?: string;
}

export const UsersSelect = ({ users, selectedUsers, onSelectChange, className }: IUsersSelectProps) => {
  const [selectLabelText, setSelectLabelText] = useState(PLACEHOLDER);
  
  const handleSelectChange = useCallback((e: ISelectChangeEvent) => {
    onSelectChange(e);

    const {changedUser: {firstName, lastName}, selectedUsers} = e;

    if (selectedUsers.size === 1) {
      setSelectLabelText(fullName(firstName, lastName));
      return;
    }

    if (selectedUsers.size > 1) {
      setSelectLabelText(`${selectedUsers.size} selected`);
      return;
    }

    setSelectLabelText(PLACEHOLDER);
  }, [selectedUsers, onSelectChange]);

  return (
    <StyledDropdown
      className={className}
      label={<Label>{selectLabelText}</Label>}
      itemList={<StyledSelectUsersListBox 
        items={users}
        selectedUsers={selectedUsers}
        createFilter={containsNameFilter}
        onSelectChange={handleSelectChange}
      />}
    />
  );
};
