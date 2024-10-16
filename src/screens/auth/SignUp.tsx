import { Center, Text, VStack } from "@gluestack-ui/themed"

import Logo from "@assets/logo/logo.svg"
import Marketspace from "@assets/logo/marketspace.svg"

import { Input } from "@components/Input"
import { Button } from "@components/Button"

export function SignUp() {
  function handleSignUp() {
    console.log("It signs up the User.")
  }
  function handleSignIn() {
    console.log("It goes to SignIn Screen")
  }
  return (
    <VStack flex={1}>
      <VStack
        bg={"$gray600"}
        px={"$12"}
        pb={"$17"}
        borderWidth={0}
        borderBottomLeftRadius={"$3xl"}
        borderBottomRightRadius={"$3xl"}
      >
        <Center>
          <Logo width={60} height={40} />

          <Text fontFamily={"$heading"} mt={"$3"} fontSize={"$lg"}>
            Boas vindas!
          </Text>
          <Text
            fontFamily={"$body"}
            mt={"$2"}
            fontSize={"$sm"}
            textAlign="center"
          >
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>
        </Center>

        <Center mt={"$19"} gap={"$4"}>
          <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
            Acesse sua conta
          </Text>

          <Input type="text" placeholder="E-mail" />
          <Input type="password" placeholder="Senha" />

          <Button label="Entrar" buttonVariant="dark" onPress={handleSignUp} />
        </Center>
      </VStack>

      <VStack mt={"$14"} px={"$12"}>
        <Center>
          <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
            Já tem uma conta?
          </Text>

          <Button
            label="Ir para o login"
            buttonVariant="muted"
            onPress={handleSignIn}
          />
        </Center>
      </VStack>
    </VStack>
  )
}
