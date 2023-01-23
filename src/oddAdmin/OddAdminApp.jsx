import React, {useState} from 'react';
import '../styles/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PageAccueil, PageConnexion, PageErreur, PageInterdit, PageNonAutorise} from "../pages";
import {AppBar, Box, FormControlLabel, FormGroup, IconButton, Switch, Toolbar, Typography} from "@mui/material";

export const OddAdminApp = () => {
    const [auth, setAuth] = useState(true);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    return (
        <BrowserRouter>
            <div className="App">
                <Box sx={{flexGrow: 1}}>
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
                                ODDysée à La Rochelle
                            </Typography>
                            {auth && (
                                <div>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                    </IconButton>
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
