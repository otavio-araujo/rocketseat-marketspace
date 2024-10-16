import { Center, Text, VStack } from "@gluestack-ui/themed"

export function SignUp() {
  return (
    <VStack flex={1} justifyContent="center">
      <Center>
        <Text fontFamily="$heading" color="$blue">
          SignUp
        </Text>
      </Center>
    </VStack>
  )
}
