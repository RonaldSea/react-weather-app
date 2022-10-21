import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/react";

export function Alert({ error, handleClose }) {
  return (
    <AlertDialog
      isOpen={error.state}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Sin resultado
          </AlertDialogHeader>

          <AlertDialogBody>
            {error.message}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={handleClose} colorScheme="green">
              Aceptar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}