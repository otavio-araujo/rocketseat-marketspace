import { useState } from "react"
import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"
import { useNavigation } from "@react-navigation/native"

import { api } from "@services/api"
import { useAuth } from "@hooks/useAuth"
import { AppError } from "@utils/AppError"

import * as yup from "yup"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import {
  Center,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "@gluestack-ui/themed"

import Logo from "@assets/logo/logo.svg"

import { Toast } from "@components/Toast"
import { Input } from "@components/Input"
import { Avatar } from "@components/Avatar"
import { Button } from "@components/Button"

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
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const [userAvatar, setUserAvatar] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
  })

  async function handleSignUp({ name, email, tel, password }: FormData) {
    if (!userAvatar) {
      return toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            title="Foto de perfil"
            toastVariant="error"
            description="Por favor, selecione uma foto de perfil."
            onClose={() => toast.close(id)}
          />
        ),
      })
    }

    setIsLoading(true)

    const fileExtension = userAvatar.split(".").pop()

    const avatarFile = {
      name: `${Date.now()}.${fileExtension}`,
      uri: userAvatar,
      type: `image/${fileExtension}`,
    } as any

    const createUserForm = new FormData()
    createUserForm.append("avatar", avatarFile)
    createUserForm.append("name", name)
    createUserForm.append("email", email)
    createUserForm.append("tel", tel)
    createUserForm.append("password", password)

    try {
      await api.post("/users", createUserForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      await signIn(email, password)

      // toast.show({
      //   placement: "top",
      //   render: ({ id }) => (
      //     <Toast
      //       id={id}
      //       title="Sucesso"
      //       toastVariant="success"
      //       description="Seu cadastro foi realizado com sucesso."
      //       onClose={() => toast.close(id)}
      //     />
      //   ),
      // })
    } catch (error) {
      setIsLoading(false)

      const isAppError = error instanceof AppError
      const description = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde."
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            title="Erro ao criar a conta"
            toastVariant="error"
            description={description}
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }
  function handleGoBack() {
    navigation.navigate("signIn")
  }

  async function handleUserAvatarSelect() {
    try {
      const avatarSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      })

      if (avatarSelected.canceled) {
        return
      }

      const photoSelected = avatarSelected.assets[0]

      if (photoSelected.uri) {
        const fileInfo = (await FileSystem.getInfoAsync(photoSelected.uri)) as {
          size: number
        }

        if (fileInfo.size && fileInfo.size / (1024 * 1024) > 3) {
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <Toast
                id={id}
                title="Foto de perfil"
                toastVariant="error"
                description="A imagem não pode ter mais que 5MB."
                onClose={() => toast.close(id)}
              />
            ),
          })
        }

        setUserAvatar(photoSelected.uri)
      }
    } catch (error) {
      console.log(error)
    }
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
            isEditable
            imageSource={userAvatar}
            handleAvatar={handleUserAvatarSelect}
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
                placeholder="Confirme a senha"
                onChangeText={onChange}
                value={value}
                errorMessages={errors.passwordConfirmation?.message}
              />
            )}
          />

          <Button
            label="Criar"
            buttonVariant="dark"
            onPress={handleSubmit(handleSignUp)}
            width={"$full"}
            isLoading={isLoading}
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
