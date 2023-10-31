import { useRouteError } from 'react-router-dom'
import { Container } from "@mui/material"

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Container sx={{ textAlign: 'center' }}>
      <p>ErrorPage</p>
      <p>{error ? (error.statusText || error.message) : ""}</p>
    </Container>
  )
}
