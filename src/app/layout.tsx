import "@/src/ui/global.css";
import "@/src/ui/variables.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        </style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
