import "./globals.css";
import "@/assets/css/main.css";
import "@/assets/css/font.css";
import ClientProvider from "./ClientProvider";

export const metadata = {
  title: {
    default: 'Admin Portal',
    template: '%s | Your Site Name'
  },
  description: 'Your default site description for SEO',
  icons: {
    icon: [
      { url: '/Techvein_logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/Techvein_logo.png', type: 'image/png' },
    ],
    shortcut: [
      { url: '/Techvein_logo.png', type: 'image/x-icon' },
    ],
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Favicons are now handled by the metadata.icons config */}
        {/* Additional head tags can be added here if needed */}
      </head>
      <body data-swift-theme="indigo">
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}