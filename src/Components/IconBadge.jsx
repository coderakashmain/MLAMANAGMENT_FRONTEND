import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function IconBadge({children}) {
  return (
    <Badge badgeContent={4} color="error">
      {children}
    </Badge>
  );
}