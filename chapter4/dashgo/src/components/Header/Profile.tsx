import { Flex, Box, Text, Avatar } from "@chakra-ui/react";
interface ProfileProps {
  showProfileData?: boolean;
}

export const Profile = ({ showProfileData = true }: ProfileProps) => {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text> David Carmo</Text>
          <Text color="gray.300" fontSize="small">
            davidsc2812@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="David Carmo"
        src="https://github.com/davidscarmo.png"
      />
    </Flex>
  );
};
