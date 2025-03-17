import React from 'react'
import { motion } from 'framer-motion'

interface LoadingStateProps {
  text?: string
  className?: string
}

const LoadingState = ({ text = 'Loading...', className = '' }: LoadingStateProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  )
}

export default LoadingState 