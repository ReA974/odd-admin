import React, {useState} from 'react';
import '../styles/App.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {PageAccueil, PageConnexion, PageErreur, PageInterdit, PageNonAutorise} from "../pages";
import {AppBar, Box, Drawer, FormControlLabel, FormGroup, IconButton, Switch, Toolbar, Typography} from "@mui/material";

export const OddAdminApp = () => {
    const [auth, setAuth] = useState(true);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const drawerWidth = 160;

    const navLinkDrawer = (
        <div>
            <ul>
                <li>
                    <NavLink activeclassname={"active"} to="/" style={{cursor: 'pointer'}}><i
                        className="fas fa-house"/>Home</NavLink>
                </li>
                <li>
                    <NavLink activeclassname={"active"} to="/error" style={{cursor: 'pointer'}}><i
                        className="fas fa-bug"/>Erreur</NavLink>
                </li>
            </ul>
        </div>
    )

    return (
        <BrowserRouter>
            <div className="App">
                <Box component="nav">
                    <Drawer variant="permanent" sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }} open>
                        {navLinkDrawer}
                    </Drawer>
                </Box>
                <Box component="main" sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`},
                }}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={auth}
                                    onChange={handleChange}
                                    aria-label="login switch"
                                />
                            }
                            label={auth ? 'Logout' : 'Login'}
                        />
                    </FormGroup>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                ODDysée
                            </Typography>
                            {auth && (
                                <div>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        color="inherit"/>
                                </div>
                            )}
                        </Toolbar>
                    </AppBar>
                </Box>

                <div>
                    <Routes>
                        <Route exact path="/" element={<PageAccueil/>}/>
                        <Route exact path="/connexion" element={<PageConnexion/>}/>
                        <Route exact path="/unauthorized" element={<PageNonAutorise/>}/>
                        <Route exact path="/forbidden" element={<PageInterdit/>}/>
                        <Route exact path="/error" element={<PageErreur/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}
