import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import { Link, useLocation } from 'react-router-dom'

const NavigationMenuContainer = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}))

const NavigationMenuItem = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    color: theme.palette.primary.main,
  },
  '&.active': {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  fontSize: '1.1rem', // Adjust the font size as needed
  marginBottom: theme.spacing(1),
  display: 'block', // Add display: 'block' for mobile view
}))

const NavigationMenu = () => {
  const location = useLocation()

  return (
    <NavigationMenuContainer>
      <NavigationMenuItem
        to="/"
        className={location.pathname === '/' ? 'active' : ''}
      >
        List Survey
      </NavigationMenuItem>
    </NavigationMenuContainer>
  )
}

export default NavigationMenu
