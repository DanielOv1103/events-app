import Navbar from "@/modules/navBar/NavBard"
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}