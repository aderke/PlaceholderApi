import React from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function withGridLoading(Component) {
  return function withLoadingComponent({ isLoading, isError, ...props }) {
    if (!isError) 
      return (
        <>
          <Component {...props} />
          { isLoading && (
            <Spinner animation="border" role="status" style={{ position: 'fixed',  top: '50%', left: '50%' }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            )}
        </>)
      
    return (<p>Error</p>)
  }
}