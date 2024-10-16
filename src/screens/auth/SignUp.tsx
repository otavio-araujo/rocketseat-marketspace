import { Center, Text, VStack } from "@gluestack-ui/themed"

import Logo from "@assets/logo/logo.svg"
import Marketspace from "@assets/logo/marketspace.svg"

import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { Avatar } from "@components/Avatar"

export function SignUp() {
  function handleSignUp() {
    console.log("It signs up the User.")
  }
  function handleSignIn() {
    console.log("It goes to SignIn Screen")
  }

  function handleUserAvatar() {
    console.log("It changes the Avatar")
  }
  return (
    <VStack flex={1} bg={"$gray600"} pt={"$16"} px={"$12"} pb={"$8"}>
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

      <Center mt={"$8"} gap={"$4"}>
        <Avatar
          imageSource="https://i.pravatar.cc/300"
          isEditable
          handleAvatar={handleUserAvatar}
        />

        <Input type="text" placeholder="Nome" />
        <Input type="text" placeholder="E-mail" />
        <Input type="text" placeholder="Telefone" />
        <Input type="password" placeholder="Senha" />
        <Input type="password" placeholder="Confirmar senha" />

        <Button label="Entrar" buttonVariant="dark" onPress={handleSignUp} />

        <Center w={"$full"}>
          <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
            Já tem uma conta?
          </Text>
          <Button
            label="Ir para o login"
            buttonVariant="muted"
            onPress={handleSignIn}
          />
        </Center>
      </Center>
    </VStack>
  )
}
