import { AlertProvider } from "./(main)/components/AlertProvider";
import TokenChecker from "./(main)/components/token_checker";
import "./globals.css";
import StoreProvider from "./providers/StoreProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <StoreProvider>
          <AlertProvider>
            {" "}
            {/* 👈 Wrap your entire app here */}
            <TokenChecker />
            {children}
          </AlertProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
