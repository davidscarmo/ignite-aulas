import {
  Link as ChakraLink,
  Icon,
  Text,
  LinkProps as ChackraInputProps,
} from "@chakra-ui/react";

import { ElementType } from "react";
import Link from "next/link";
interface NavLinkProps extends ChackraInputProps {
  icon: ElementType;
  children: string;
  href: string;
}
export const NavLink = ({ icon, children, href, ...rest }: NavLinkProps) => {
  return (
    <Link href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </Link>
  );
};
