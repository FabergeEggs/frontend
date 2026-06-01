"use client"
import {setAccessToken, getAccessToken} from '@/src/lib/store/tokenStore'
import { useEffect } from 'react'

export default function Page() {
    useEffect(() => {
        setAccessToken("Balalaikaa")
        console.log(getAccessToken)
    }, [])
    
    
    return (
        <p>{getAccessToken()}</p>
    )
}
