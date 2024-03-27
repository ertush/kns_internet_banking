
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme, Flex, ThemePanel } from '@radix-ui/themes';


export const metadata = {
  title: "kns ibanking",
  description: "kns internet banking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="teal" appearance="dark">
          <div className="w-full h-screen flex justify-center items-center">
           {children}
          </div>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
