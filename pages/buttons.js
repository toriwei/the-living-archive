'use client'
import React, { useState } from 'react'
export default function ButtonClicks() {
  return (
    <div>
      <button onClick={() => console.log('wow')}>Click</button>
    </div>
  )
}
