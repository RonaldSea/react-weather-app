import { Image, Stack, Text } from "@chakra-ui/react";
export function MainInfo({ weatherData }) {
  return (
    <Stack direction="column" alignItems="center" py={2}>
      <Stack direction="row" justify="space-between" w="full">
        <Text>{`${weatherData.name}, ${weatherData.country}`}</Text>
        <Text>{weatherData.dt}</Text>
      </Stack>
      <Stack direction="row" align="center">
        <Image
          src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
          alt={weatherData.description}
          mt={0}
        />
        <Text as="p" fontSize="5xl">
          {Math.floor(weatherData.temp)}<Text as="sup">°ᶜ</Text>
        </Text>
      </Stack>
      <Text>{weatherData.description}</Text>
    </Stack>
  )
}