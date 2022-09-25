import { Button } from "components/button"
import { useAuth } from "contexts/auth-context"
import React from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

const menuLinks = [
    {
        url: "/",
        title: "Home",
    },
    {
        url: "/blog",
        title: "Blog",
    },
    {
        url: "/contact",
        title: "Contact",
    },
]
const HeaderStyles = styled.header`
    padding: 40px 0;
    .header-main{
        display: flex;
        align-items: center;
    }
    .logo{
        display: block;
        max-width: 50px;
    }
    .menu{
        display: flex;
        align-items: center;
        gap: 20px;
        margin-left: 40px;
        list-style: none;
        font-weight: 500;
    }
    .search{
        margin-left: auto;
        padding: 15px 25px;
        border: 1px solid #ccc;
        border-radius: 8px;
        width: 100%;
        max-width: 320px;
        display: flex;
        align-items: center;
        position: relative;
        margin-right: 20px;
    }
    .search-input{
        flex: 1;
        padding-right: 45px;
        font-weight: 500;
    }
    .search-icon{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 25px;
    }
    .header-button{
        margin-left: 20px;
    }
    .header-auth{

    }
    
`
const Header = () => {
    const {userInfo} = useAuth()
    return (
        <HeaderStyles>
            <div className="container">
                <div className="header-main">
                    <NavLink to="/">
                        <img srcSet="/logo.png 2x" alt="monkey bloging" className="logo"></img>
                    </NavLink>
                    <ul className="menu">
                        {menuLinks.map(item => (
                            <li className="menu-item" key={item.title}>
                                <NavLink to={item.url} className="menu-link">{item.title}</NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="search">
                        <input type="text" className="search-input" placeholder="Search posts..."/>
                        <svg with="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {!userInfo ? (<Button kind="primary" type="button" height="56px" className="header-button" to="/sign-up">Sign Up</Button>):(
                        <div className="header-auth">
                            <span>Welcome back, </span>
                            <strong className="text-primary">{userInfo?.displayName}</strong>
                        </div>
                    )}
                </div>
            </div>
        </HeaderStyles>
    )
}


export default Header