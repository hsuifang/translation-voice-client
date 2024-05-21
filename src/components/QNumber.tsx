import {
  FormControl,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
} from '@chakra-ui/react';

interface QNumberProps {
  label?: string;
  min?: number;
  max?: number;
  value: number;
  handleOnChange: (val: number) => void;
}

function QNumber({ min, max, value, handleOnChange }: QNumberProps) {
  return (
    <FormControl display="flex" alignItems="center">
      {/* <FormLabel>{label}</FormLabel> */}
      <NumberInput min={min} max={max} value={value} onChange={(_, valueAsNumber) => handleOnChange(valueAsNumber)}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}

export default QNumber;
