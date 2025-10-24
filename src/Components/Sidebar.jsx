import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import PixRoundedIcon from '@mui/icons-material/PixRounded'
import SatelliteAltRoundedIcon from '@mui/icons-material/SatelliteAltRounded'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation() 
  const tabs = [
    { name: 'Dashboard', icon: <BarChartRoundedIcon style={{ fontSize: 20 }} />, path: '/dashboard' },
    { name: 'Proposals', icon: <AccountTreeRoundedIcon style={{ fontSize: 20 }} />, path: '/proposals' },
    { name: 'Letters', icon: <EmailRoundedIcon style={{ fontSize: 20 }} />, path: '/letters' },
    { name: 'Funds', icon: <PixRoundedIcon style={{ fontSize: 20 }} />, path: '/funds' },
    { name: 'Communications', icon: <SatelliteAltRoundedIcon style={{ fontSize: 20 }} />, path: '/communications' },
  ]

  return (
    <aside id="sidebar" className="p-5 py-5 ">
      <h1 className="text-2xl select-none font-semibold">BHATLI MLA</h1>
      <p className="text-secondary mt-7 mb-2 px-1 select-none">Main Menu</p>
      <ul className="mt-5 select-none text-md">
        {tabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path)
          return (
            <li
              key={tab.name}
              className={`flex items-center mt-2 py-2 px-2 rounded-sm cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-white translate-x-4 block shadow-md ' 
                  : 'hover:bg-gray-50 hover:translate-x-2'
              }`}
              onClick={() => navigate(tab.path)}
            >
              {tab.icon}
              <span className="ml-2">{tab.name}</span>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default Sidebar
