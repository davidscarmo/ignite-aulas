import { createContext, ReactNode, useContext, useEffect } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface SidebarDrawerProviderProps {
  children: ReactNode;
}
type SidebarDrawerContextData = UseDisclosureReturn;
const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  // it closes the sidebar every time you change the page
  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);
  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

// hook to use the context
export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
