import React from 'react'

const Popup = ({ children }) => {
    return (
        <section className='fixed left-0 top-0 w-full h-screen bg-popup z-10000 flex justify-center items-center'>
            {children}
        </section>
    )
}

export default Popup
