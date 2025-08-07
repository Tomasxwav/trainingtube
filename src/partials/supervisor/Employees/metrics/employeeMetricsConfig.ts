
export const getShortEmployeeName = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[1].charAt(0)}.`;
  }
  return name.length > 12 ? `${name.substring(0, 12)}...` : name;
};
