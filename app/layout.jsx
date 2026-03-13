import "./globals.css";

export const metadata = {
  title: "Dev by Gitwork",
  description: "Book vetted developers by stack, availability, and cost.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
