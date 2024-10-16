import { Center, Spinner } from "@gluestack-ui/themed"

export function Loading() {
  return (
    <Center flex={1} justifyContent="center">
      <Spinner color="$blue" />
    </Center>
  )
}
