import "./globals.css";

export const metadata = {
  title: "Dev by Gitwork",
  description: "Tell us what you want to build and get matched with developers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
