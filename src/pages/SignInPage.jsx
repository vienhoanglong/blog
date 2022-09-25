import { Button } from 'components/button'
import { Field } from 'components/field'
import { Input } from 'components/input'
import { Label } from 'components/label'
import { useAuth } from 'contexts/auth-context'
import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthenticationPage from './AuthenticationPage'
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { toast } from "react-toastify"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'firebases/firebase-config'
import InputPasswordToggle from 'components/input/InputPasswordToggle'
const schema = yup.object({
    email: yup.string().email("Please enter valid email address").required("Please enter your email address"),
    password: yup.string().min(8, "Your password must be at least 8 character or greater").required("Please enter your password")
  })
const SignInPage = () => {
    const {handleSubmit, control, formState: {isValid, isSubmitting, errors}} = useForm({mode: "onChange", resolver: yupResolver(schema)})
    useEffect(()=> {
        const arrErrors = Object.values(errors)
        if(arrErrors.length > 0){
          toast.error(arrErrors[0]?.message, {pauseOnHover: false, delay: 0})
        }
    }, [errors])
    const {userInfo} = useAuth()
    const navigate = useNavigate()
    useEffect(() =>{
        document.title = "Login Page"
        if(userInfo?.email) navigate("/")
    },[navigate, userInfo])
    const handleSignIn = async(values) =>{
        if(!isValid)return;
        try {      
            await signInWithEmailAndPassword(auth, values.email, values.password)
            navigate("/")
        } catch (error) {
            if (error.message.includes("wrong-password"))
                toast.error("It seems your password was wrong");
        }
    }

    return (
        <AuthenticationPage>
            <form className="form" onSubmit={handleSubmit(handleSignIn)} autoComplete="off">
                <Field>
                    <Label htmlFor="email">Email address</Label>
                    <Input type="email" name="email" placeholder="Enter your email address" control={control}></Input>
                </Field>
                <Field>
                    <Label htmlFor="password">Password</Label>
                    <InputPasswordToggle control={control}></InputPasswordToggle>
                </Field>
                <div className="have-account">Don't have an account? <NavLink to={"/sign-up"}>Register an account</NavLink>{" "}</div>
                <Button kind="primary" type="submit" style={{width: "100%", maxWidth:350, margin: "0 auto"}} isLoading={isSubmitting} disabled={isSubmitting}>Sign In</Button>
            </form>
        </AuthenticationPage>
    )
}

export default SignInPage