import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Divider, List, ListItem, ListItemButton, Button,
  ListItemText, CssBaseline, AppBar, Toolbar, IconButton, Drawer, Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogOutButton from './authentication/LogOutButton';

const drawerWidth = 240;

function Header(props) {
  // eslint-disable-next-line react/prop-types
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>ODDyssée</Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} component={Link} to="/poi">
            <ListItemText primary="Point d'intérêts" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} component={Link} to="/group">
            <ListItemText primary="Groupes" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography
              variant="h6"
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              ODDyssée
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: '40px' }}>
              <Button sx={{ color: '#fff' }} component={Link} to="/poi">Point d&apos;intérêts</Button>
              <Button sx={{ color: '#fff' }} component={Link} to="/group">Groupes</Button>
            </Box>
          </Box>
          <LogOutButton />
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export function HeaderAuth() {
  return (
    <AppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h5" component="div">
          ODDyssée
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
