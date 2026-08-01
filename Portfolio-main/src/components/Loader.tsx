import React from 'react'

interface LoaderProps {
  loading: boolean
}

export default function Loader({ loading }: LoaderProps) {
  if (!loading) return null

  return (
    <div className="loader-overlay">
      <div className="loader">
        <div className="load-inner load-one"></div>
        <div className="load-inner load-two"></div>
        <div className="load-inner load-three"></div>
        <span className="text">Loading...</span>
      </div>
    </div>
  )
}
