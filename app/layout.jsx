import "./globals.css";
import ThemeProvider from "./theme-provider";

export const metadata = {
  title: "Nikendra | Portfolio",
  description: "Portfolio website of Nikendra Shekhawat",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
