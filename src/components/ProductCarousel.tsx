import React, { useRef } from "react"
import { Dimensions } from "react-native"
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel"
import { useSharedValue } from "react-native-reanimated"

import { Box, Image, Text, View } from "@gluestack-ui/themed"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { ProductImageDTO } from "@dtos/ProductImageDTO"
import { api } from "@services/api"

type CarouselProps = React.ComponentProps<typeof View> & {
  data: ProductImageDTO[]
  isActive?: boolean
}

export function ProductCarousel({
  data,
  isActive = true,
  ...rest
}: CarouselProps) {
  const { tokens } = gluestackUIConfig
  const { width } = Dimensions.get("window")

  const scrollOffsetValue = useSharedValue<number>(0)
  const progress = useSharedValue<number>(0)
  const ref = useRef<ICarouselInstance>(null)

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    })
  }

  return (
    <View minHeight={250} position="relative" {...rest}>
      <Carousel
        ref={ref}
        onProgressChange={progress}
        autoPlay={false}
        width={width}
        height={250}
        snapEnabled={true}
        pagingEnabled={true}
        data={data}
        defaultScrollOffsetValue={scrollOffsetValue}
        style={{ width: "100%" }}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Image
              position="relative"
              source={{ uri: `${api.defaults.baseURL}/images/${item.path}` }}
              alt="Foto do produto"
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
            {!isActive && (
              <Box
                width={"100%"}
                alignItems="center"
                justifyContent="center"
                height={"100%"}
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                bg="rgba(26, 24, 27, 0.6)"
              >
                <Text
                  textTransform="uppercase"
                  fontFamily={"$heading"}
                  color={"$gray700"}
                  fontSize={"$md"}
                >
                  anúncio desativado
                </Text>
              </Box>
            )}
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{
          width: 121,
          height: 3,
          backgroundColor: tokens.colors.inactiveCarousel,
          borderRadius: 999,
        }}
        activeDotStyle={{
          overflow: "hidden",
          backgroundColor: tokens.colors.activeCarousel,
          borderRadius: 999,
        }}
        containerStyle={{
          position: "absolute",
          bottom: 2,
          gap: 4,
        }}
        horizontal
        onPress={onPressPagination}
      />
    </View>
  )
}
