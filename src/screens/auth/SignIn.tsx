import {
  Button,
  ButtonText,
  Center,
  EyeIcon,
  EyeOffIcon,
  Input as GluestackInput,
  InputField,
  InputIcon,
  InputSlot,
  Text,
  VStack,
} from "@gluestack-ui/themed"

import Logo from "@assets/logo/logo.svg"
import Marketspace from "@assets/logo/marketspace.svg"
import { useState } from "react"
import { Input } from "@components/Input"

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }
  return (
    <VStack flex={1}>
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

          {/* <GluestackInput
            borderWidth={0}
            bg={"$gray700"}
            px={"$4"}
            py={"$3"}
            minHeight={"$11"}
            maxHeight={"$11"}
            rounded={"$md"}
          >
            <InputField
              type={showPassword ? "text" : "password"}
              color={"$gray200"}
              placeholder="Senha"
              placeholderTextColor={"$gray400"}
              fontFamily="$body"
              fontSize={"$md"}
            />

            <InputSlot pr={"$2"} onPress={handleState}>
              <InputIcon
                as={showPassword ? EyeIcon : EyeOffIcon}
                color={"$gray300"}
              />
            </InputSlot>
          </GluestackInput> */}

          <Button
            size="sm"
            mt={"$4"}
            bgColor={"$blueLight"}
            w={"$full"}
            p={"$3"}
            minHeight={"$11"}
            maxHeight={"$11"}
            borderRadius={"$md"}
          >
            <ButtonText color={"$white"} fontFamily="$heading" fontSize={"$sm"}>
              Entrar
            </ButtonText>
          </Button>
        </Center>
      </VStack>

      <VStack mt={"$14"} px={"$12"}>
        <Center gap={"$4"}>
          <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
            Ainda não tem acesso?
          </Text>
          <Button
            size="sm"
            bgColor={"$gray500"}
            w={"$full"}
            p={"$3"}
            minHeight={"$11"}
            maxHeight={"$11"}
            borderRadius={"$md"}
          >
            <ButtonText
              color={"$gray200"}
              fontFamily="$heading"
              fontSize={"$sm"}
            >
              Criar uma conta
            </ButtonText>
          </Button>
        </Center>
      </VStack>
    </VStack>
  )
}
