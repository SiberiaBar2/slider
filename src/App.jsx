// import logo from './logo.svg';
// import './App.css';
import { Provider } from 'mobx-react'
import store from './store/index'

import Index from '../src/pages/index'

function App() {
  return (
    <Provider {...store}>
      <div className="App">
        <Index />
      </div>
    </Provider>
  );
}

export default App;
