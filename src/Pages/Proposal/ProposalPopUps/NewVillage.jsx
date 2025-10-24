import React from 'react'
import Popup from '../../../Components/Popup'
import ClosePopUp from '../../../Components/ClosePopUp'

const NewVillage = () => {
  return (
     <Popup>
        
        <div className='h-50 w-100 bg-white rounded-xl relative'>
            <ClosePopUp/>
        </div>
    </Popup>
  )
}

export default NewVillage
