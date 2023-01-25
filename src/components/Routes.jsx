/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import { CircularProgress } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../services/firestore.service';

export function PrivateRoute() {
  const [user] = useAuthState(auth);

  return user ? <Outlet /> : <Navigate to="/authentication/signin" />;
}

export function DisconnectedRoute() {
  const [user] = useAuthState(auth);

  return user ? <Navigate to="/poi" /> : <Outlet />;
}

// export function PrivateRoute({ children, ...rest }) {
//   const [user, loading] = useAuthState(auth);
//   if (loading) {
//     return (
//       <div className="App-centered">
//         <CircularProgress sx={{ marginTop: '50px' }} />
//       </div>
//     );
//   }

//   return (
//     <Route
//       {...rest}
//       render={() => (user ? (
//         children
//       ) : (
//         <Navigate replace to="/poi" />
//       ))}
//     />
//   );
// }
// PrivateRoute.propTypes = {
//   children: PropTypes.element.isRequired,
// };

// export function DisconnectedRoute({ children, ...rest }) {
//   const [user, loading] = useAuthState(auth);

//   if (loading) {
//     return (
//       <div className="App-centered">
//         <CircularProgress sx={{ marginTop: '50px' }} />
//       </div>
//     );
//   }

//   return (
//     <Route
//       {...rest}
//       render={() => (!user ? (
//         children
//       ) : (
//         <Navigate replace to="/poi" />
//       ))}
//     />
//   );
// }

// DisconnectedRoute.propTypes = {
//   children: PropTypes.element.isRequired,
// };
