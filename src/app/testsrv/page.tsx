"use server"
import {setAccessToken, getAccessToken} from '@/src/lib/store/tokenStore'

export default async function Page() {
    setAccessToken("Balalaika")
    console.log(getAccessToken())
    return (
        <p>{getAccessToken()}</p>
    )
}
