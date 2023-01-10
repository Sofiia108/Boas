import {useState, React} from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import makeStyles from "@material-ui/styles/makeStyles";
import './Menu.css'

const useStyles = makeStyles({
  popOverRoot: {
    pointerEvents: "none"
  }
});

export default function MyMenuItem({item}) {

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
    <>
      {
        item.hasOwnProperty('subMenu') ?
        <>
        <Button  
          style={{color: 'black'}}
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          onMouseOver={handleClick}
          onMouseLeave={handleCloseHover}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {item.label}
        </Button>
        
        <Menu
          className='menu-item'
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

        {
          item.subMenu.map((subItem, index2) => {
          return (
            <MenuItem key={index2} onClick={handleClose} className='menu-item'>{subItem.label}</MenuItem>
          )
          })
        }
        </Menu>
      </>

      :
      
      <Button
      style={{color: 'black'}}
      aria-owns={anchorEl ? "simple-menu" : undefined}
      aria-haspopup="true"
      onClick={handleClick}
      onMouseOver={handleClick}
      onMouseLeave={handleCloseHover}
      >
        {item.label}
      </Button>
      
      }
    </>)
}