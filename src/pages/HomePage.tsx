import Router from "next/router"
import { useEffect } from "react"
import { MainLayout } from "../components/MainLayout"
import checkAuth from "../helpers/checkAuth"
import logout from "../helpers/logout"

export default function HomePage() {
    useEffect(() => {
        const auth = checkAuth()
        console.log(auth);
        if (auth === false) {
            logout()
            Router.push("/");
        }
    })
    return <MainLayout><div>Welcome</div></MainLayout>
}