import {
  Box,
  Heading,
  Text
} from "@chakra-ui/react";

export function EmptyState() {
  return (
    <Box as="section" textAlign="center" mx="auto">
      <Heading>Consulta el clima de tu ciudad</Heading>
      <Text pt={2}>O de <Text as="span" color="green.200">cualquier ciudad del mundo</Text>. Tú decides.</Text>
    </Box>
  )
}