import { ThemeProvider } from "@/config/theme";

export default function AuthLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="auth-container">
        <main>{children}</main>
      </div>
    </ThemeProvider>
  );
}
