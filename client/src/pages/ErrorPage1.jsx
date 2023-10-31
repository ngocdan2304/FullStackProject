import { useRouteError } from 'react-router-dom'

export default function ErrorPage1() {
  const error = useRouteError();

  return (
    <div>
      <p>ErrorPage1</p>
      <p>{error ? (error.statusText || error.message) : ""}</p>
    </div>
  )
}
