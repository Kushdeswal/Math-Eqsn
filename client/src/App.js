import React, { useState } from 'react'
import Addque from './AddQue'
import Getquestions from './Getquestions'

const App = () => {
  const [toggle,settoggle]=useState(false)
  return (
    <div>
      {toggle ? <Addque settoggle={settoggle}/> :<Getquestions settoggle={settoggle}/> }
    </div>
  )
}

export default App