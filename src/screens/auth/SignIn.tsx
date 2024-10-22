import { useNavigation } from "@react-navigation/native"

import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import {
  Center,
  FormControlError,
  FormControlErrorText,
  Text,
  VStack,
} from "@gluestack-ui/themed"

import Logo from "@assets/logo/logo.svg"
import Marketspace from "@assets/logo/marketspace.svg"

import { Input } from "@components/Input"
import { Button } from "@components/Button"

import { AuthNavigatorRoutesProps } from "@routes/auth.routes"
import { useAuth } from "@hooks/useAuth"

type FormData = {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup
    .string()
    .required("E-mail obrigatório.")
    .email("E-mail inválido")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "E-mail inválido"),
  password: yup.string().required("Senha obrigatória."),
})

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
  })

  function handleSignUp() {
    navigation.navigate("signUp")
  }
  function handleSignIn({ email, password }: FormData) {
    signIn(email, password)
  }
  return (
    /* Container */
    <VStack flex={1} bg={"$gray700"}>
      {/* Login Form */}
      <VStack
        bg={"$gray600"}
        pt={"$11"}
        px={"$12"}
        pb={"$17"}
        borderWidth={0}
        borderBottomLeftRadius={"$3xl"}
        borderBottomRightRadius={"$3xl"}
      >
        {/* Logo */}
        <Center mt={"$16"}>
          <Logo />
          <Marketspace style={{ marginTop: 20 }} />
          <Text fontFamily={"$light"} mt={"$1"} fontSize={"$sm"}>
            Seu espaço de compra e venda
          </Text>
        </Center>
        {/* End - Logo */}

        {/* Form */}
        <Center mt={"$19"} gap={"$4"}>
          <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
            Acesse sua conta
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                type="text"
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                errorMessages={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                type="password"
                placeholder="Senha"
                onChangeText={onChange}
                value={value}
                errorMessages={errors.password?.message}
                onSubmitEditing={handleSubmit(handleSignIn)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            width={"$full"}
            label="Entrar"
            buttonVariant="primary"
            onPress={handleSubmit(handleSignIn)}
          />
        </Center>
        {/* End - Form */}
      </VStack>
      {/* End - Login Form */}

      <VStack mt={"$14"} px={"$12"}>
        <Center gap={"$4"}>
          <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
            Ainda não tem acesso?
          </Text>

          <Button
            width={"$full"}
            label="Criar uma conta"
            buttonVariant="muted"
            onPress={handleSignUp}
          />
        </Center>
      </VStack>
    </VStack>
    /* End - Container */
  )
}
