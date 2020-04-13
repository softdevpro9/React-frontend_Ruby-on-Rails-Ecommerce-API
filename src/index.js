import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// const AppStrict = () => {
//   return (
//     <React.StrictMode>
//         <App/>
//     </React.StrictMode>
//   );
// };

ReactDOM.render(<App />, document.getElementById('root') );

serviceWorker.unregister();
