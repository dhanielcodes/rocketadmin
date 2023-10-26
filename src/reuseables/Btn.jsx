/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button,  } from '@arco-design/web-react';

function Btn({children,loading,type,styles,size,disabled,clicking,className}) {
  return (
    <Button className={className} onClick={clicking} disabled={disabled} style={styles || {color:"#fff",padding:"11px","borderRadius":"5px",background:"#00A85A",}} type={type} loading={loading} size={90}>
    {children}
  </Button>
  )
}

export default Btn