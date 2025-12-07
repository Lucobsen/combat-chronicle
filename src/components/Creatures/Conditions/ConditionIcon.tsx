import { IconButton } from '@mui/material';
import type { JSX } from 'react';

interface IConditionIconProps {
  icon: JSX.Element;
  label: string;
  isActive: boolean;
  updateCondition: () => void;
}

export const ConditionIcon = ({
  label,
  updateCondition,
  icon,
  isActive,
}: IConditionIconProps) => {
  return (
    <IconButton
      size="small"
      title={label}
      onClick={updateCondition}
      sx={{
        height: 16,
        width: 16,
        opacity: isActive ? 1 : 0.2,
      }}
    >
      {icon}
    </IconButton>
  );
};
