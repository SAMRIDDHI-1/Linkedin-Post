import './global.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        backgroundColor: '#fafafa',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        margin: 0,
        padding: 0
      }}>
        {children}
      </body>
    </html>
  );
}