import { Box, HStack } from '@chakra-ui/react';
import { useRadio, useRadioGroup, UseRadioProps } from '@chakra-ui/radio';

interface RadioCardProps extends UseRadioProps {
  children: React.ReactNode;
  isActive: boolean;
}

function RadioCard(props: RadioCardProps) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} readOnly={props.isReadOnly} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        color={props.isActive ? '#616161' : '#eee'}
        borderColor={props.isActive ? '#616161' : '#eee'}
        fontSize="20px"
        fontWeight="bold"
        _checked={{
          bg: 'primary.200',
          color: 'white',
          borderColor: 'primary.200',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={4}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  );
}

interface QSingleProps {
  items: string[];
  isActive: boolean;
  isReadOnly: boolean;
  onChange: (val: string) => void;
}

function QSingle({ items: options, onChange, isReadOnly, isActive }: QSingleProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group} wrap="wrap">
      {options &&
        options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio} isReadOnly={isReadOnly} isActive={isActive}>
              {value}
            </RadioCard>
          );
        })}
    </HStack>
  );
}

export default QSingle;
