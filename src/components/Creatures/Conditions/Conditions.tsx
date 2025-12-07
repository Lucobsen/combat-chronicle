import { Stack } from "@mui/material";
import { ConditionIcon } from "./ConditionIcon";
import { useSnackbar } from "notistack";
import { useConditions } from "./conditions.hook";

interface IConditionProps {
  name: string;
  currentConditions: string[];
  onUpdate: (condition: string) => void;
}

export const Conditions = ({
  name,
  currentConditions,
  onUpdate,
}: IConditionProps) => {
  const conditions = useConditions();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Stack direction="row" justifyContent="space-between">
      {conditions.map(({ label, icon }, index) => (
        <ConditionIcon
          key={`${label}-${index}`}
          label={label}
          icon={icon}
          isActive={currentConditions.includes(label)}
          updateCondition={() => {
            enqueueSnackbar(
              `${name} is ${
                !currentConditions.includes(label) ? "now" : "no longer"
              } ${label}`,
              { variant: "info" }
            );
            onUpdate(label);
          }}
        />
      ))}
    </Stack>
  );
};
