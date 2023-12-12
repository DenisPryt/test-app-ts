import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';

import { Label } from '../label';
import { RadioButton } from '../radio-button';

interface ILabeledRadioButtonProps {
  value?: string | ReadonlyArray<string> | number;
  checked?: boolean;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

const StyledLabel = styled(Label)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;
`;

export const LabeledRadioButton = ({value, checked, label, onChange, className}: ILabeledRadioButtonProps) => {
  return (
    <StyledLabel className={className}>
      <RadioButton name='radio' value={value} checked={checked} onChange={onChange} />
      {label}
    </StyledLabel>
  );
};
