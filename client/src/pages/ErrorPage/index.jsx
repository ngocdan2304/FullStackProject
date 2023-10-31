import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <p>ErrorPage</p>
      <p>{error ? (error.statusText || error.message) : ""}</p>
    </div>
  )
}
