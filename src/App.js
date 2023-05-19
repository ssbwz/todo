//react
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

//Components
import NavBar from './components/navbar';

// Pages
import HomePage from './pages/HomePage'
import ToDOPage from './pages/ToDOPage'

//GlobalState 
import { Global } from './storage/GlobalState';

//style
import './App.css';
import Grid from '@mui/material/Grid';

function App() {


  return (
    <Global Root={() =>
      <div className="App">
        <Grid container
          spacing={2}
        >
          <Router>
            <Grid item sm={2} xs={12} md={2} lg={2}>
              <NavBar />
            </Grid>

            <Grid item sm={10} xs={12} md={10} lg={10}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/todo" element={<ToDOPage />} />
              </Routes>
            </Grid>

          </Router>
        </Grid>
      </div>
    } />
  );
}

export default App;
