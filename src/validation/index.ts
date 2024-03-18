import { defaultFromInputs } from "../data";

export const InputValidator = (input: { [key: string]: string }) => {
  const errors = defaultFromInputs;
  const gainFields = [
    "gain1",
    "gain2",
    "gain3",
    "gain4",
    "gain5",
    "gain6",
    "gain7",
    "gain8",
    "gain9",
    "gain10",
  ];

  for (const gainField of gainFields) {
    const gainValue = input[gainField];

    if (!gainValue.trim().length) {
      errors[gainField] = "gain 1 is required!";
    } else if (isNaN(Number(gainValue))) {
      errors[gainField] = "gain 1 must be a number!";
    } else if (Number(gainValue) < 0 || Number(gainValue) > 10) {
      errors[gainField] = "gain 1 must must be between 0 and 10";
    } else {
      errors[gainField] = "";
    }
  }

  return errors;
};
