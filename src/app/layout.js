import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content="IEEE Sahrdaya SB" />
        <title>IEEE Sahrdaya SB</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
        <meta
          name="description"
          content="Official website of IEEE Student Branch at Sahrdaya College of Engineering and Technology, Kodakara. IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ieeesahrdaya.com" />
        <meta property="og:title" content="IEEE Sahrdaya SB" />
        <meta
          property="og:description"
          content="Official website of IEEE Student Branch at Sahrdaya College of Engineering and Technology, Kodakara. IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity."
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/jTdGHMd/IEEE-Sahrdaya-SB.jpg"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="IEEE Sahrdaya SB" />
        <meta
          property="twitter:description"
          content="Official website of IEEE Student Branch at Sahrdaya College of Engineering and Technology, Kodakara. IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity."
        />
        <meta
          property="twitter:image"
          content="https://i.ibb.co/jTdGHMd/IEEE-Sahrdaya-SB.jpg"
        />
        <meta
          name="keywords"
          content="IEEE Sahrdaya SB, student branch, engineering society, professional development, technical skills, leadership, networking, events, workshops, seminars, competitions, technology, innovation, IEEE Kerala Section, IEEE Region R10, Sahrdaya College of Engineering and Technology, scet, IEEE Xplore, IEEE Students, IEEE LINK, membership, professional members, societies, student affinity groups, execom, branch counsellor, chairperson, vice chairperson"
        />
        <link rel="apple-touch-icon" href="/public/apple-touch-icon.png"></link>

        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
