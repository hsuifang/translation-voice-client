import { ChangeEventHandler } from 'react';
import { Select } from '@chakra-ui/react';

interface QSelectProps {
  label?: string;
  items: string[];
  value: number;
  placeholder?: string;
  isReadOnly: boolean;
  isActive: boolean;
  handleOnChange: ChangeEventHandler<HTMLSelectElement>;
}

function QSelect({ value, items, handleOnChange, placeholder, isReadOnly, isActive }: QSelectProps) {
  return (
    <Select
      onClick={(e) => e.stopPropagation()}
      placeholder={placeholder}
      onChange={handleOnChange}
      value={value}
      isReadOnly={isReadOnly}
      isDisabled={!isActive}
    >
      <option disabled>請選擇</option>
      {items &&
        items.map((item, idx) => (
          <option key={`${item}${idx}`} value={item}>
            {item}
          </option>
        ))}
    </Select>
  );
}

export default QSelect;
