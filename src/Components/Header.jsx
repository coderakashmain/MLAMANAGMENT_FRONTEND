import React, { useEffect, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import IconBadge from './IconBadge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CustomIconButton from './CustomIconButton';
import { useLocation, useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const [finalLocation, setFinalLocation] = useState([]);
  const [exactName, setExactName] = useState('Dashboard')
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    const parts = path.split('/').filter(Boolean);

    setFinalLocation(parts);
    setExactName(
      parts.length === 0
        ? 'Dashboard'
        : parts[parts.length - 1].charAt(0).toUpperCase() +
        parts[parts.length - 1].slice(1)
    );
  }, [location.pathname]);

  const handleNavigate = (index) => {
    const newPath = '/' + finalLocation.slice(0, index + 1).join('/');
    navigate(newPath);
  };

  return (
    <header className='w-full bg-bg  sticky top-0 left-0 z-10000 mb-4 h-15 flex items-center p-1   justify-between'>
      <div>
        <p className="text-sm ">
          Pages /{' '}
          {finalLocation.length === 0 ? (
            <span className="font-semibold cursor-pointer " onClick={() => navigate('/')}>
              Dashboard
            </span>
          ) : (
            finalLocation.map((p, index) => (
              <span key={index}>
                <span
                  className={`font-medium hover:text-blue-600 cursor-pointer transition`}
                  onClick={() => handleNavigate(index)}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </span>
                {index < finalLocation.length - 1 && ' / '}
              </span>
            ))
          )}
        </p>

        <h4 className='mt-1'>{exactName}</h4>
      </div>
      <div className='flex gap-2'>
        <div className='border bg-white border-gray-300 rounded-sm p-1  text-sm  transition-all  hover:shadow-md hover:border-gray-400 gap-3 '>
          <SearchIcon style={{ fontSize: 20 }} className='text-gray-400 ' />

          <input type="text" id='searchbox' placeholder='Type here...' className='group h-full outline-none' />
        </div>
        <CustomIconButton title="Settings">
          <SettingsIcon style={{ fontSize: 20, cursor: 'pointer' }} className='text-black' />

        </CustomIconButton>
        <CustomIconButton title="Notifications">
          <IconBadge>
            <NotificationsIcon style={{ fontSize: 20, cursor: 'pointer' }} className='text-black' />
          </IconBadge>
        </CustomIconButton>
      </div>
    </header>
  )
}

export default Header
