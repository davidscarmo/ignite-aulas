import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClasseName: string;
}

export function ActiveLink({
  children,
  activeClasseName,
  ...props
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  const className = asPath === props.href ? activeClasseName : "";

  //className property has the same name as the var above 
  return <Link {...props}>{cloneElement(children, { className })}</Link>;
}
