// type
// 可以傳什麼值
import { InputHTMLAttributes } from 'react';
import { type FieldErrors, type FieldValues, type Path, type UseFormRegister } from 'react-hook-form';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

interface InputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  disabled?: boolean;
  errors?: FieldErrors<T>;
  register: UseFormRegister<T>;
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled' | 'form';
}

function InputField<T extends FieldValues>({
  disabled = false,
  placeholder,
  errors,
  label,
  name,
  value,
  register,
  variant = 'outline',
  type = 'text',
  color = 'white',
}: InputProps<T>) {
  const isError = Boolean(errors && errors[name]);

  return (
    <FormControl isInvalid={isError} marginBottom="16px">
      {value && <FormLabel color="primary.100">{label ?? ''}</FormLabel>}
      <Input
        type={type}
        variant={variant}
        placeholder={placeholder || `Enter ${label}`}
        disabled={disabled}
        value={value}
        {...register(name as Path<T>)}
        borderBottomColor="primary.100"
        color={color}
      />
      {isError && <FormErrorMessage>{errors && (errors[name]?.message as string)}</FormErrorMessage>}
    </FormControl>
  );
}

export default InputField;
