/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react'
import Success from '../images/Success.svg'
import Failed from '../images/Fail.svg'
function Msg({children,type}) {
  return (
    <div>
        <div style={{display:"flex",flexDirection:"column",gap:"20px",padding:"1em"}}>
          <img src={type ? Success : Failed} height="50px"/>
          <p>
          {children}
          </p>
        </div>

    </div>
  )
}

export default Msg