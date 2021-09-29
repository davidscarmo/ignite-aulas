import {
  InputProps as ChackraInputProps,
  Input as ChackraInput,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

interface InputProps extends ChackraInputProps {
  name: string;
  label?: string;
}

export const Input = ({ name, label, ...inputProps }: InputProps) => {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}> {label} </FormLabel>}
      <ChackraInput
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{ bgColor: "gray.900" }}
        size="lg"
        {...inputProps}
      />
    </FormControl>
  );
};
