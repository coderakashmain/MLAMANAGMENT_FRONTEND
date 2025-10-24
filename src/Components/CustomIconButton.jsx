import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'


const CustomIconButton = React.memo(({title,children}) => {
  return (
    <Tooltip title={title} arrow >
        <IconButton >
            {children}
        </IconButton>
      
    </Tooltip>
  )
})

export default CustomIconButton
