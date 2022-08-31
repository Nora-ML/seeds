/* import Head from 'next/head' */
import NProgress from "nprogress"
import Router from "next/router"
//link is used to prevent page load on route change
import Link from 'next/link'
//only possible after installing and configuring @zeit/next-css
import 'nprogress/nprogress.css';
import { isAuth,logout } from "../helpers/auth";
import styles from "../public/static/css/nav.module.css"
import { useEffect, useState } from "react";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Layout = ({ children }) => {
    console.log("Layout Component is being Rendered .")
    const [userName, setUserName] = useState(
    <>
    <Link href="/register">

        <a className={styles.navBar_list__anchor} >Register</a>

    </Link>
    <Link href="/login">

        <a className={styles.navBar_list__anchor} >Login</a>
    </Link>
        </>
    );

    // we had to use this turn around of implementing aview through useEffect
    // due to an issue of server side rendering text-xontent difference error
    //this is far from perfect but will do for now
    useEffect(() => {

        const authenticate = isAuth() && isAuth().role;
        authenticate === 'admin'
            ? setUserName(                   
                <>
                <Link href="/admin">
                    <a className={styles.navBar_list__anchor} >Admin</a>   
                </Link>
                 <a className={styles.navBar_list__anchor} onClick={() => logout()} >LogOut</a>
               </>
            ) : authenticate === 'subscriber'
                ? setUserName(
                    <>
                        <Link href="/user">
                       
                            <a className={styles.navBar_list__anchor} >{isAuth().name}</a>
                           
                    </Link>
                     <a className={styles.navBar_list__anchor} onClick={() => logout()} >LogOut</a>
                     </>
                ) : setUserName(
                    <>
                            <Link href="/register">
                        
                                <a className={styles.navBar_list__anchor} >Register</a>
                        
                            </Link>
                            <Link href="/login">
                        
                                <a className={styles.navBar_list__anchor} >Login</a>
                            </Link>
                        </>
                        )
    },[])

    /* const head = () => (
        <link rel="stylesheet" href="/static/css/nav.css"/>
    ) */
    const nav = () => (
        <>
            <div className={styles.header}>
                <h1 className={styles.navLogo}>
                <Link href="/">
                    <a className={styles.navBar_list__anchor} >Logo</a>
                    </Link>
                </h1>
                <ul className={styles.navBar}>
                    <li className={styles.navBar_list}><a className={styles.navBar_list__anchor} href="">
                        About</a></li>
                    <li className={styles.navBar_list}><a className={styles.navBar_list__anchor} href="">
                        Products</a></li>
                    <li className={styles.navBar_list}><a className={styles.navBar_list__anchor} href="">
                        News</a></li>
                    <li className={styles.navBar_list}><a className={styles.navBar_list__anchor} href="">
                        Shops</a></li>
                </ul>
                <h3 className={styles.navStore}>
                    {userName}            
                </h3>
            </div>
        </>
    )
    return(
        <>
            {/* {head()} */}
            {nav()}
            <div>
            {children} 
            </div>
        </>
    )
}

export default Layout;