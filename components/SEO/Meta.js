import React from 'react'
import Head from 'next/head';

export default function Meta() {
    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>Manish Kumar Portfolio - Computer Science Student & Backend Developer</title>
            <meta charSet="utf-8" />
            <meta name="title" content="Manish Kumar Portfolio - Computer Science Student & Backend Developer" />
            <meta name="description"
                content="Manish Kumar's (ezManish) Personal Portfolio Website. Made with Ubuntu 20.04 (Linux) theme by Next.js and Tailwind CSS." />
            <meta name="author" content="Manish Kumar (ezManish)" />
            <meta name="keywords"
                content="ezManish, Manish Kumar, Manish Kumar portfolio, Manish Kumar backend, Manish Kumar Galgotias, Manish ubuntu, Manish portfolio" />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#E95420" />

            {/* Search Engine */}
            <meta name="image" content="images/logos/fevicon.png" />
            {/* Schema.org for Google */}
            <meta itemProp="name" content="Manish Kumar Portfolio - Computer Science Student & Backend Developer" />
            <meta itemProp="description"
                content="Manish Kumar's (ezManish) Personal Portfolio Website. Made with Ubuntu 20.04 (Linux) theme by Next.js and Tailwind CSS." />
            <meta itemProp="image" content="images/logos/fevicon.png" />

            {/* Open Graph general */}
            <meta name="og:title" content="Manish Kumar Portfolio - Computer Science Student & Backend Developer" />
            <meta name="og:description"
                content="Manish Kumar's (ezManish) Personal Portfolio Website. Made with Ubuntu 20.04 (Linux) theme by Next.js and Tailwind CSS." />
            <meta name="og:image" content="images/logos/logo_1200.png" />
            <meta name="og:url" content="https://github.com/ezManish/Manish_Portfolio" />
            <meta name="og:site_name" content="Manish Kumar Personal Portfolio" />
            <meta name="og:locale" content="en_IN" />
            <meta name="og:type" content="website" />

            <link rel="icon" href="images/logos/fevicon.svg" />
            <link rel="apple-touch-icon" href="images/logos/logo.png" />
        </Head>
    )
}
