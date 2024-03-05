// by using .jsx it helps differentiate where react components are from basic js files.
import React, {useState, useEffect} from 'react'
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, SettingFilled, } from '@ant-design/icons';

import icon from '../images/cryptocurrency.png';    
const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true); //creating the state for active menu and then it is set to true initially, which we  can later set to false using a useeffect hook if the screen size reaches a particular width.
    const [screenSize, setScreenSize] = useState(null);

    useEffect(()=> {
        const handleResize = () =>setScreenSize(window.innerWidth); // this function will help set the screen size to window.innerwidth (window.innerwidth helps us know the size of our browser)

        window.addEventListener('resize', handleResize) //we need to add a window.addeventlistener on resize, so everytime the window 'resizes', we want to perform the handleResize function.

        handleResize(); //then we can call the handle resize function
        return () => window.removeEventListener('resize', handleResize);
    }, []); //this useEffect doesnt have nany dependency array meaning it will render once at the start.

    useEffect(()=> {
        if(screenSize<768){  //so this useEffect checks if the screenSize state is less than 768 then its in mobile and we can set the activemenue to be false.
            setActiveMenu(false); 
        } else{
            setActiveMenu(true);
        }
    }, [screenSize]); //this particular useEffect is going to run only if the screenSize changes thats why we put it in the dependency array.

  return (
    <div className="nav-container">
        <div className="logo-container">
            
            <Avatar src={icon} size="large" />

            <Typography.Title level={2} className='logo'>
                <Link to ="/homepage" > Cryptocreek </Link>
            </Typography.Title>

            <Button className='menu-control-container' onClick={()=> setActiveMenu(!activeMenu)}>
                <MenuOutlined />
            </Button> {/*  creating a button and giving it an onClick property that sets the active menu to !activeMenu so that when you click it you can click it again and it hides */}
             {/* creating a button and giving it an onClick property that sets the active menu to true. so setActiveMenu to true onClick. But this wont hide the menu once clicked again.*/}

        </div>
        {/* we only want to show the menu bars if the activeMenu is true, so we use conditional templating */}
        {activeMenu && ( 
            <Menu theme='dark'> 
            <Menu.Item icon={<HomeOutlined />} >
                <Link to="/homepage">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />} >
                <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined />} >
                <Link to="/exchanges">Exchanges</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />} >
                <Link to="/news">News</Link>
            </Menu.Item>
            <Menu.Item icon={ <SettingFilled />} >
                <Link to="/profile">Profile</Link>
            </Menu.Item>
        </Menu>
        )}

    </div>
  )
}

export default Navbar
