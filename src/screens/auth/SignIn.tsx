import { useNavigation } from "@react-navigation/native"

import { Center, Text, VStack } from "@gluestack-ui/themed"

import Logo from "@assets/logo/logo.svg"
import Marketspace from "@assets/logo/marketspace.svg"

import { Input } from "@components/Input"
import { Button } from "@components/Button"

import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  function handleSignUp() {
    navigation.navigate("signUp")
  }
  function handleSignIn() {
    console.log("It logs in the User.")
  }
  return (
    <VStack flex={1} bg={"$gray700"}>
      <VStack
        bg={"$gray600"}
        pt={"$11"}
        px={"$12"}
        pb={"$17"}
        borderWidth={0}
        borderBottomLeftRadius={"$3xl"}
        borderBottomRightRadius={"$3xl"}
      >
        <Center mt={"$16"}>
          <Logo />
          <Marketspace style={{ marginTop: 20 }} />
          <Text fontFamily={"$light"} mt={"$1"} fontSize={"$sm"}>
            Seu espaço de compra e venda
          </Text>
        </Center>

        <Center mt={"$19"} gap={"$4"}>
          <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
            Acesse sua conta
          </Text>

          <Input type="text" placeholder="E-mail" />
          <Input type="password" placeholder="Senha" />

          <Button
            label="Entrar"
            buttonVariant="primary"
            onPress={handleSignIn}
          />
        </Center>
      </VStack>

      <VStack mt={"$14"} px={"$12"}>
        <Center gap={"$4"}>
          <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
            Ainda não tem acesso?
          </Text>

          <Button
            label="Criar uma conta"
            buttonVariant="muted"
            onPress={handleSignUp}
          />
        </Center>
      </VStack>
    </VStack>
  )
}
