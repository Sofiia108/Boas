import {useState, React} from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MyMenuItem from './MyMenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import makeStyles from "@material-ui/styles/makeStyles";
import './Menu.css'


export default function CustomizedMenus() {

  const menuItems = [
    {
      label: 'Baby',
      link: '#',
      subMenu: [

        {
          label: 'All baby products',
          link: '#'
        },

        {
          label: 'Closing',
          link: '#'
        },

        {
          label: 'Accessories',
          link: '#'
        },

        {
          label: 'Toys and gifts',
          link: '#'
        },

        {
          label: 'Food and drinks',
          link: '#'
        },

        {
          label: 'Browse baby brands',
          link: '#'
        }

      ]
    },

    {
      label: 'Kids',
      link: '#',
      subMenu: [
        {
          label: 'All kids products',
          link: '#'
        },

        {
          label: 'Closing',
          link: '#'
        },

        {
          label: 'Shoes',
          link: '#'
        },

        {
          label: 'Accessories',
          link: '#'
        },

        {
          label: 'Toys',
          link: '#'
        },

        {
          label: 'Food and drinks',
          link: '#'
        },

        {
          label: 'GIFTS',
          link: '#'
        },

        {
          label: 'BROWSE KIDS BRANDS',
          link: '#'
        },
      ]
    },

    {
      label: 'About Us',
      link: '#',
      subMenu: [
        {
          label: 'Mission',
          link: '#'
        },

        {
          label: 'All profits donated',
          link: '#'
        },

        {
          label: 'Sustainability',
          link: '#'
        },

        {
          label: 'Team',
          link: '#'
        },

        {
          label: 'FAQ',
          link: '#'
        },
      ]
    },

    {
      label: 'Contact',
      link: '#'
    },

    {
      label: 'Blog & Podcast',
      link: '#',
    },
  ];

  return (
    <div>
      {menuItems.map((item) => {
        return <MyMenuItem item={item}/>})}
    </div>
  );
}