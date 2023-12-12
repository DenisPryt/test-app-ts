import React, { useCallback, useDeferredValue, useMemo, useState } from "react";
import styled, { StyledComponentPropsWithRef } from "styled-components";
import { getBorder, getBorderRadius } from "../../../styles/border";

import { fullName } from "../../../store/users/helpers";
import { IUser } from '../../../store/users/users';

import { LazyDrawList } from "../../lazy-draw-list";
import { SearchInput } from "../../search-input";
import { LabeledCheckbox } from "../../labeled-checkbox";

const UsersListBoxContainer = styled.section`
  display: flex;
  flex-direction: column;
  border: ${getBorder('solid', 'secondary')};
  border-radius: ${getBorderRadius('bottom')};
  border-top: none;
  background: white;
`;

const StyledSearchInput = styled(SearchInput)`
  margin: 1rem;
`;

const StyledLabeledCheckbox = styled(LabeledCheckbox)`
  margin: 0 1rem;
`;

export interface ISelectChangeEvent {
  changedUser: IUser;
  isChecked: boolean;
  selectedUsers: Set<string>;
}

interface IUsersListBoxProps extends StyledComponentPropsWithRef<typeof UsersListBoxContainer> {
  items: IUser[];
  selectedUsers: Set<string>;
  createFilter: (filterText: string) => (item: IUser) => boolean;
  onSelectChange: (event: ISelectChangeEvent) => void;
}

export const SelectUsersListBox = ({items, createFilter, onSelectChange, selectedUsers, ...otherProps}: IUsersListBoxProps) => {
  const [filterText, setFilterText] = useState("");
  const deferredFilterText = useDeferredValue(filterText);

  const filteredUsers = useMemo(
    () => items.filter(createFilter(deferredFilterText)),
    [items, deferredFilterText]
  );
  
  const handleSelectionChange = useCallback((user: IUser, isChecked: boolean) => {
    const updatedSelectedUsers = new Set(selectedUsers);
    if (isChecked) {
      updatedSelectedUsers.add(user.id);
    } else {
      updatedSelectedUsers.delete(user.id);
    }
    
    onSelectChange({changedUser: user, isChecked, selectedUsers: updatedSelectedUsers});
  }, [onSelectChange]);

  const renderItem = useCallback((user: IUser) => (
    <StyledLabeledCheckbox 
      name={fullName(user.firstName, user.lastName)}
      checked={selectedUsers.has(user.id)}
      onSelectionChange={(e) => handleSelectionChange(user, e.target.checked)}
    />
  ), [selectedUsers, handleSelectionChange]);

  return (
    <UsersListBoxContainer {...otherProps}>
      <StyledSearchInput type='text' value={filterText} onChange={(e) => setFilterText(e.target.value)} />
      <LazyDrawList items={filteredUsers} renderItem={renderItem} />
    </UsersListBoxContainer>
  );
};
