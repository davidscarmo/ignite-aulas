import { Header } from "../components/Header";
import { Flex } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" mx="auto" maxW={1480} px="6">
        <Sidebar />
      </Flex>
    </Flex>
  );
}
