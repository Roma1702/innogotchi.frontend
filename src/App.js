import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { Spinner } from 'react-bootstrap';
import AppRouter from './components/AppRouter';
import { check } from './http/UserAPI';

const App = observer(() => {

  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <Spinner animation="border" variant='light' style={{ margin: "auto" }} />
    </div>
  }

  return (
    <>
      <Router>
        <NavBar />
        <AppRouter />
      </Router>
    </>
  );
});

export default App;
