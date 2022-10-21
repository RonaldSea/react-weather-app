import { SearchIcon } from "@chakra-ui/icons"
import { IconButton, Input, Stack } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../ColorModeSwitcher"

const Search = ({ inputHandler, callAPI }) => {
  return (
    <Stack direction="row">
      <Input placeholder="Buscar una ciudad" onChange={inputHandler} ></Input>
      <IconButton aria-label="Search database" icon={<SearchIcon />} onClick={callAPI} />
      <ColorModeSwitcher />
    </Stack>
  )
}
export { Search }