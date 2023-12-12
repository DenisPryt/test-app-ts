import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { getBorder, getBorderRadius } from '../../styles/border';
import { expandHeight } from '../../styles/keyframes/expand-height';

import { IOrganization } from '../../store/organizations/organizations';

import { Dropdown } from '../dropdown/Dropdown';
import { Label } from '../label';
import { List } from '../list';
import { LabeledRadioButton } from '../labeled-radio-button';

const StyledDropdown = styled(Dropdown)`
  min-width: 13rem;
`;

const StyledList = styled(List)`
  display: inline-block;
  width: 100%;
  max-height: 25rem;

  border: ${getBorder('solid', 'secondary')};
  border-radius: ${getBorderRadius('bottom')};
  border-top: none;
  background: white;

  overflow-x: hidden;
  animation: ${expandHeight} 0.2s ease-out;
`;

const StyledLabel = styled(Label)`
  cursor: pointer;
`;

interface IOrganizationsSelectProps {
  organizations: IOrganization[];
  selectedOrganizationId?: string;
  onSelectChange: (organization: IOrganization) => void;
  className?: string;
}

const StyledLabeledRadioButton = styled(LabeledRadioButton)`
  margin: 1rem;
`;

const PLACEHOLDER = 'select organization';

export const OrganizationsSelect = ({organizations, selectedOrganizationId, onSelectChange, className} : IOrganizationsSelectProps) => {
  const [selectLabelText, setSelectLabelText] = useState(PLACEHOLDER);
  
  const handleSelectChange = useCallback((organization: IOrganization) => {
    onSelectChange(organization);

    if (!organization) {
      setSelectLabelText(PLACEHOLDER);
      return;
    }

    setSelectLabelText(organization.name);
  }, [onSelectChange]);

  return (
    <StyledDropdown
      className={className}
      label={<StyledLabel>{selectLabelText}</StyledLabel>}
      itemList={(
        <StyledList>
          {organizations.map(organization => {
            const {id, name} = organization;
            return (
              <li key={id}>
                <StyledLabeledRadioButton
                  value={id}
                  label={name}
                  checked={!!selectedOrganizationId && selectedOrganizationId === id}
                  onChange={() => handleSelectChange(organization)} />
              </li>
            );
          })}
        </StyledList>
      )}
    />
  );
};