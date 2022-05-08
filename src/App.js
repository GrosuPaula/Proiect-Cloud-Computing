import './App.css';
import { useState } from 'react';
import { SignIn } from './components/SignIn/SignIn';
import { Dashboard } from './components/Dashboard/Dashboard'
 
function App() {

  const [currentUserId, setCurrentUserId] = useState(null);

  return (
    <div className="App">
      {currentUserId !== null ? 
        <Dashboard  setCurrentUserId = {setCurrentUserId} currentUserId = {currentUserId}/> 
        :
        <SignIn setCurrentUserId = {setCurrentUserId} /> }
    </div>
  );
}

export default App;