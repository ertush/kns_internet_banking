
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme, ThemePanel } from '@radix-ui/themes';


export const metadata = {
  title: "kns ibanking",
  description: "kns internet banking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="teal" appearance="dark">
          {children}
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
