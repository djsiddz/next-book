import './globals.css'

export const metadata = {
  title: 'Next Book',
  description: 'What are you reading?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
