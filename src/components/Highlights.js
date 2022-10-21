import { Badge, SimpleGrid, Stack, Stat, StatGroup, StatHelpText, StatNumber, Text } from "@chakra-ui/react";

export function Highlights({ weatherData }) {
  return (
    <Stack w="full" pl={[0, 0, 5]} textAlign="center">
      <Text textAlign="left" fontWeight="bold">
        Destacados de hoy
      </Text>
      <SimpleGrid minChildWidth="150px" spacing={3}>
        {
          !!Object.keys(weatherData).length &&
          weatherData.info.map(item => (
            <Stack key={item.name} borderWidth="1px" height="150px" borderRadius="12px" p={3}>
              <Badge variant="outline" colorScheme="green" width="fit-content" whiteSpace="break-spaces">
                {item.name}
              </Badge>
              <StatGroup height="full" alignItems="center">
                <Stat>
                  <StatNumber fontSize="xl">{item.firstMeasurement}</StatNumber>
                  <StatNumber fontSize="xl">{item.secondMeasurement}</StatNumber>
                  <StatHelpText>{item.unit}</StatHelpText>
                </Stat>
              </StatGroup>
            </Stack>
          ))
        }
      </SimpleGrid>
    </Stack>
  )
}