import './globals.css'

export const metadata = {
  title: 'SecuMatch24 – Professionelle Security sofort verfügbar',
  description: 'Die führende Plattform für Security-Dienstleistungen in Deutschland. Geprüfte Anbieter für Events, Objektschutz, Personenschutz und mehr. Kostenlose Anfrage in 2 Minuten.',
  keywords: 'Security, Sicherheitsdienst, Event Security, Türsteher, Doorman, Personenschutz, Objektschutz, Security buchen',
  openGraph: {
    title: 'SecuMatch24 – Professionelle Security sofort verfügbar',
    description: 'Geprüfte Security-Anbieter in 24h. Kostenlos anfragen.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
