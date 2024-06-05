import { Select, SystemStyleObject } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface Options {
  key: string;
  value: string;
}
interface ISelectProps {
  variant?: string;
  value: string;
  options: Options[];
  setValue: (value: string) => void;
  disabled?: boolean;
  size?: string;
  style?: SystemStyleObject;
}

const SelectOptions = ({ variant, value, setValue, disabled = false, options, size, style }: ISelectProps) => {
  return (
    <Select
      variant={variant}
      isDisabled={disabled}
      borderRadius="8px"
      bg="gray.100"
      value={value}
      size={size}
      textAlign="center"
      onChange={(e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value)}
      sx={style}
    >
      {options.map((option) => (
        <option key={option.key} value={option.value}>
          {option.key}
        </option>
      ))}
    </Select>
  );
};

export default SelectOptions;
