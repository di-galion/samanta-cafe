import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from "@/providers/providers";
import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";
import {POPUP_ID} from "@/constants/popup.constants";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Samanta cafe',
    template: "%s | Samanta cafe"
  },
  description: 'Samanta cafe in Maga',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers >
          <Header />
          <main className={"pt-36 mb-20 max-w-[1000px] mx-auto px-2 min-h-screen"} style={{maxWidth: "1300px", minHeight: "100%"}}>
            {children}
            {/*<div id={POPUP_ID} className={" w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-30"}></div>*/}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
