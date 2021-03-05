import axios, { AxiosRequestConfig } from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";

export const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccessState] = useState(undefined)

    useEffect(() => {
        document.title = `LOGIN ${success === undefined ? "" : success ? "Success" : "Failed"}`
    }, [username, success])
    const login = async () => {

        const data = JSON.stringify({
            query: `mutation{
            login(data:{
                email:"${username}"
                password:"${password}"
            }){
                isSuccess{success}
                refreshToken
                accessToken
                user{
                id
                firstName
                lastName
                }
                interimToken
            }
            }`,
            variables: {}
        });

        const config: AxiosRequestConfig = {
            method: 'post',
            url: 'https://staging.graph.stockedge.com/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        try {
            const response = await axios(config)
            console.log(JSON.stringify(response.data))
            setSuccessState(response.data.data ? response.data.data.login.isSuccess.success : false)
            if (response.data.data && response.data.data.login.isSuccess.success) {
                localStorage.setItem("Authentication", response.data.data.login.accessToken)
                Router.push("/HomePage")
            }
        } catch (err) {
            console.error(err)
        }
    }
    return <div>
        <form>
            <label>Enter Username:</label><br></br>
            <input name="username" onChange={(e) => setUsername(e.target.value)}></input><br></br>
            <label>Enter Password</label><br></br>
            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}></input><br></br>
            <input type="button" onClick={() => login()} value="Login"></input>
        </form>
    </div>
}