import React, { ChangeEventHandler } from "react";
import styled from "styled-components";

import { Checkbox } from "../checkbox";
import { Label } from "../label";

interface ILabeledCheckboxProps {
  name: string;
  checked: boolean;
  onSelectionChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

const StyledLabel = styled(Label)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;
`;

export const LabeledCheckbox = ({name, checked, onSelectionChange, className}: ILabeledCheckboxProps) => {
  return (
    <StyledLabel className={className}>
      <Checkbox name={name} checked={checked} onChange={onSelectionChange} />
      {name}
    </StyledLabel>
  );
};
