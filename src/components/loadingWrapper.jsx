import {
    Spinner,
  } from 'react-bootstrap'

export const LoadingWrapper = ({children, isLoading}) => {
  return (
    <>
    {
      isLoading ? 
      (
        <span>
            <Spinner animation="border" size="sm" /> Loading...
        </span>
      ) : 
      (
        children
      )}
    </>
  )
}