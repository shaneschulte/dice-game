import React from 'react';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import GamePage from './pages/game_page';
import {store} from './store';
import HomePage from './pages/home_page';
import CookiePage from './pages/cookie_page';
import {connect} from 'react-redux';
import {ReduxState} from './store';
import {ThemeContext} from './themes';
import keycloak from './keycloak';

interface Props {}

interface State {}

const mapStateToProps = (state: ReduxState) => {
  return {
    theme: state.theme,
  };
};

const AppThemer = connect(mapStateToProps)(({theme}) => {
  return (
    <ThemeContext.Provider value={theme}>
      <AppInner />
    </ThemeContext.Provider>
  );
});

const App = () => {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
    <Provider store={store}>
      <AppThemer />
    </Provider>
    </ReactKeycloakProvider>
  );
};

const AppInner = () => {
  const theme = React.useContext(ThemeContext);
  return (
    <Router>
      <div className="App" style={theme.app}>
        <Route path="/" exact component={CookiePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/room/:room" component={GamePage} />
        <AuthBanner />
      </div>
    </Router>
  );
};

const AuthBanner = () => {
  const { keycloak } = useKeycloak();
  if(!keycloak) {
    return null
  }
  return <button onClick={(keycloak as any).login}>{(keycloak as any).authenticated ? "logged in" : "not logged in"}</button>;
}

export default App;
