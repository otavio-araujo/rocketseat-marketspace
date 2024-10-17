import { Center, Text } from "@gluestack-ui/themed"

export function Home() {
  return (
    <Center flex={1} justifyContent="center">
      <Text fontFamily={"$body"} fontSize={"$lg"}>
        Home
      </Text>
    </Center>
  )
}
