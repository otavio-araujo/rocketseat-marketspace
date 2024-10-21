import { useNavigation } from "@react-navigation/native"

import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Center, ScrollView, Text, VStack } from "@gluestack-ui/themed"

import Logo from "@assets/logo/logo.svg"

import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { Avatar } from "@components/Avatar"

import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

type FormData = {
  name: string
  email: string
  tel: string
  password: string
  passwordConfirmation: string
}

const signUpSchema = yup.object({
  name: yup.string().required("Nome obrigatório."),
  email: yup
    .string()
    .required("E-mail obrigatório.")
    .email("E-mail inválido")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "E-mail inválido"),
  tel: yup.string().required("Telefone obrigatório."),
  password: yup
    .string()
    .required("Senha obrigatória.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Senha inválida. Deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
    ),
  passwordConfirmation: yup
    .string()
    .required("Confirme sua senha.")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais."),
})

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
  })

  function handleSignUp({ name, email, tel, password }: FormData) {
    console.log(name, email, tel, password)
  }
  function handleGoBack() {
    navigation.navigate("signIn")
  }

  function handleUserAvatar() {
    console.log("It changes the Avatar")
  }
  return (
    <ScrollView flexGrow={1} showsVerticalScrollIndicator={false}>
      {/* Container */}
      <VStack flex={1} bg={"$gray600"} pt={"$16"} px={"$12"} pb={"$8"}>
        {/* Welcome Message */}
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
        {/*End -  Welcome Message */}

        {/* Create Account Form */}
        <Center mt={"$8"} gap={"$4"}>
          <Avatar
            imageSource="https://i.pravatar.cc/300"
            isEditable
            handleAvatar={handleUserAvatar}
          />

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                type="text"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessages={errors.name?.message}
              />
            )}
          />

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
            name="tel"
            render={({ field: { onChange, value } }) => (
              <Input
                type="text"
                placeholder="+55 (00) 00000-0000"
                onChangeText={onChange}
                value={value}
                errorMessages={errors.tel?.message}
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
              />
            )}
          />

          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { onChange, value } }) => (
              <Input
                type="password"
                placeholder="Cofirme a senha"
                onChangeText={onChange}
                value={value}
                errorMessages={errors.passwordConfirmation?.message}
              />
            )}
          />

          <Button
            label="Entrar"
            buttonVariant="dark"
            onPress={handleSubmit(handleSignUp)}
            width={"$full"}
          />

          <Center w={"$full"} gap={"$2"}>
            <Text fontFamily={"$body"} fontSize={"$sm"} color={"$gray200"}>
              Já tem uma conta?
            </Text>
            <Button
              width={"$full"}
              label="Ir para o login"
              buttonVariant="muted"
              onPress={handleGoBack}
            />
          </Center>
        </Center>
        {/* End - Create Account Form */}
      </VStack>
      {/* End - Container */}
    </ScrollView>
  )
}
