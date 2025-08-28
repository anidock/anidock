
import './globals.css'

export const metadata = {
  title: 'Anidock - India Anime Finder',
  description: 'Find where to watch anime legally in India'
}

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  )
}
