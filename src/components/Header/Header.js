import {useState, React} from 'react'
import { Link } from 'react-router-dom'
import MyMenu from '../MyMenu/MyMenu'
import { styled, alpha } from '@mui/material/styles';
import { IoSearch } from 'react-icons/io5'
import { FiUser } from 'react-icons/fi'
import { BiShoppingBag } from 'react-icons/bi'
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LOGO from '../accets/logo.png'
import './Header.css'
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles({
  popOverRoot: {
    pointerEvents: "none"
  }
});

export default function Header() {

  let currentlyHovering = false;
  const styles = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleHover() {
    currentlyHovering = true;
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleCloseHover() {
    currentlyHovering = false;
    setTimeout(() => {
      if (!currentlyHovering) {
        handleClose();
      }
    }, 50);
  }

    return (

    <div className='header-main-container'>

      <div className='header-first-container'>

        <div className='first-container-search-icon'><IoSearch size={30}/></div>
        <div className='first-container-logo'>
          <img className='logo' src={LOGO} alt='Logo'/>
        </div>

        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          onMouseOver={handleClick}
          onMouseLeave={handleCloseHover}
        >
          <FiUser size={40} color={'black'}/>
        </Button>
        
        <Menu
          className='first-container-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            onMouseEnter: handleHover,
            onMouseLeave: handleCloseHover,
            style: { pointerEvents: "auto" }
          }}
          getContentAnchorEl={null}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          PopoverClasses={{
            root: styles.popOverRoot
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/login">Login</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/register">Register</Link>
          </MenuItem>
        </Menu>

        <div className='first-container-shoping-icon'>
          <BiShoppingBag size={40}/>
        </div>
      
      </div>

          <div className='header-second-container'>
              <MyMenu className='header-second-container-menu'/>
          </div>
          
      </div>
    )
  }

