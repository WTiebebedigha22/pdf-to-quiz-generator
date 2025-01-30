'use client'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const supabase = createClient()

    async function handleClick() {
        setIsLoading(true)
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/api/auth/callback',
            },
        })

        if (error) {
            console.log('wtf')
        }
    }

    return (
        <main className="w-4/5 mx-auto min-h-screen gap-8 flex justify-center items-center flex-col">
            <div className="desc flex justify-center gap items-center flex-col">
                <h1 className="text-3xl font-bold">ReiBot 🤖📑</h1>
                <h3 className="text-center text-lg font-medium">
                    Study your pdf materials, the Smart way.
                </h3>
            </div>

            <div className="gap-3 flex justify-center items-center flex-col">
                {isLoading && (
                    <div className="flex justify-center items-center">
                        <Image
                            className="loader"
                            alt="a loader bruh"
                            src="/loaderr.svg"
                            width={25}
                            height={25}
                        />
                    </div>
                )}

                <button
                    onClick={handleClick}
                    className="flex hover: gap-2 bg-white text-black rounded-lg px-4 py-2 font-semibold"
                >
                    <Image
                        src="/google.svg"
                        alt="google icon"
                        width={20}
                        height={20}
                    />
                    Sign in with google
                </button>
            </div>
        </main>
    )
}
