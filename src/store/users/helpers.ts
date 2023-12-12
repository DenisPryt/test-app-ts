
export const fullName = (firstName : string, lastName : string) => {
  const trimmedFirstName = firstName.trim();
  const trimmedLastName = lastName.trim();
  const needSeparator = trimmedFirstName.length > 0 && trimmedLastName.length > 0;
  const separator = needSeparator ? ' ' : '';

  return `${trimmedFirstName}${separator}${trimmedLastName}`;
};
