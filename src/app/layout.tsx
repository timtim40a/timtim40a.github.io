import type { Metadata } from 'next'
import './globals.css'
import Header from './_components/header/Header'
import Footer from './_components/footer/Footer'

export const metadata: Metadata = {
    title: 'tymur-soroka',
    description:
        'Full-stack developer and multimedia artist based in Brighton. TypeScript, React, Next.js, Node.js, Python.',
    keywords: [
        'Tymur Soroka',
        'software development',
        'web development',
        'personal artworks',
        'projects',
        'portfolio',
    ],
    openGraph: {
        type: 'website',
        url: 'https://timtimsays.art/',
        title: 'Tymur Soroka - Portfolio',
        description:
            'Full-stack developer and multimedia artist based in Brighton. TypeScript, React, Next.js, Node.js, Python.',
        images: [{ url: 'https://timtimsays.art/thumbnail.png' }],
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://timtimsays.art/',
        title: 'Tymur Soroka - Portfolio',
        description:
            'Full-stack developer and multimedia artist based in Brighton. TypeScript, React, Next.js, Node.js, Python.',
        images: ['https://timtimsays.art/thumbnail.png'],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    )
}
