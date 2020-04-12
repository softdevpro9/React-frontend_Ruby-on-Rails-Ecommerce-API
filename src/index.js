import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, withRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const AppWithRouter = withRouter(App);

const AppContainer = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AppWithRouter/>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.render(<AppContainer />, document.getElementById('root') );

serviceWorker.unregister();
