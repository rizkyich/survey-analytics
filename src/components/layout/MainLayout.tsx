import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import SnackbarProvider from '../Snackbar/SnackbarProvider';

import NavigationMenu from './NavigationMenu'
import LogoutButton from './LogoutButton'

import { AuthProvider } from '../../modules/authentication/AuthProvider'

const RootContainer = styled('div')({
  width: '100vw',
  height: '100%',
  overflow: 'hidden',
})

const AppHeader = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: 'white',
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  color: '#004d40',
}))

const ContentContainer = styled(Grid)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  height: '100%',
  paddingTop: theme.spacing(12),
  maxWidth: '1920px',
  marginLeft: 250,
  paddingBottom: theme.spacing(5),
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}))

const DrawerContainer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none',
    width: 250,
    flexShrink: 0,
  },
}))

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: '1rem',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}))

const NavigationContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
    width: 250,
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    paddingTop: theme.spacing(10),
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}))

const MainLayout = () => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <SnackbarProvider>
      <AuthProvider>
        <RootContainer>
          <AppHeader position="fixed">
            <Toolbar>
              <MenuButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </MenuButton>
              <Typography variant="h6" noWrap>
                SurveyPulse
              </Typography>
              <div style={{ flexGrow: 1 }}></div>
              <LogoutButton />
            </Toolbar>
          </AppHeader>
          <DrawerContainer
            variant="temporary"
            open={open}
            onClose={toggleDrawer}
            anchor="left"
          >
            <NavigationMenu />
          </DrawerContainer>
          <NavigationContainer item xs={12} md={3} lg={2}>
            <NavigationMenu />
          </NavigationContainer>
          <ContentContainer item xs={12} md={9} lg={10}>
            <Outlet />
          </ContentContainer>
        </RootContainer>
      </AuthProvider>
    </SnackbarProvider>
  )
}

export default MainLayout
