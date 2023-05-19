import './style/navbar.css'
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';

function NavBar() {

  return <>
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="active" >  <HomeOutlinedIcon fontSize='large' /> </Link>
        </li>
        <li>
          <Link to="/todo" className="active" > <ListAltIcon fontSize='large' /></Link>
        </li>

      </ul>
    </nav>

  </>
}

export default NavBar;