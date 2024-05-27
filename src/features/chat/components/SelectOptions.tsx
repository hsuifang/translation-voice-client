import { Select, SystemCSSProperties } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface Options {
  key: string;
  value: string;
}
interface ISelectLangProps {
  value: string;
  options: Options[];
  setValue: (value: string) => void;
  disabled: boolean;
  size?: string;
  style?: SystemCSSProperties;
}

const SelectOptions = ({ value, setValue, disabled, options, size, style }: ISelectLangProps) => {
  return (
    <Select
      width={style?.width || '100%'}
      bgColor={style?.bgColor || 'gray.100'}
      isDisabled={disabled}
      borderRadius="8px"
      bg="gray.100"
      value={value}
      size={size}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.key} value={option.value}>
          {option.value}
        </option>
      ))}
    </Select>
  );
};

export default SelectOptions;
