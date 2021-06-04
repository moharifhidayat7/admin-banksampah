import React from 'react'

export default function CardGudang({title,children}) {
  return (
    <div className="border-2 border-blue-800 rounded-sm">
    <div className="w-full bg-blue-800 p-2 text-white font-medium">
      {title}
    </div>
  {children}
 </div>
  )
}
