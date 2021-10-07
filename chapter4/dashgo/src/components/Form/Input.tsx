  import {
    InputProps as ChackraInputProps,
    Input as ChackraInput,
    FormLabel,
    FormControl,
    FormErrorMessage,
  } from "@chakra-ui/react";
  import { forwardRef, ForwardRefRenderFunction } from "react";
  import { FieldError } from "react-hook-form";
  interface InputProps extends ChackraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
  }

  const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
    { name, label, error = null, ...inputProps },
    ref
  ) => {
    return (
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel htmlFor={name}> {label} </FormLabel>}
        <ChackraInput
          name={name}
          id={name}
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant="filled"
          _hover={{ bgColor: "gray.900" }}
          size="lg"
          ref={ref}
          {...inputProps}
        />
        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  };

  export const Input = forwardRef(InputBase);
