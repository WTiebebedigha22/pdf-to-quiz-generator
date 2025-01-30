import '../ui/globals.css'
import { Metadata } from 'next'
import { Toaster } from 'sonner'
import { ThemeProvider } from 'next-themes'
import { Geist } from 'next/font/google'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
    // metadataBase: new URL('https://ai-sdk-preview-pdf-support.vercel.app'),
    title: 'ReiBot 🤖📑',
    description: 'Study your pdf materials, The Smart way.',
    openGraph: {
        title: '',
        description: 'Study the better way. The Smart way.',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${geist.className} antialiased`}
        >
            <body>
                <ThemeProvider
                    attribute="class"
                    enableSystem
                    forcedTheme="dark"
                >
                    <Toaster position="top-center" richColors />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
