import { ThemeProvider } from "@/config/theme";
import AuthLayout from "@/components/layout/auth";

export default function AuthLayoutMain({ children }) {
  return (
    <ThemeProvider>
      <AuthLayout>
        <div className="auth-container">
          <main>{children}</main>
        </div>
      </AuthLayout>
    </ThemeProvider>
  );
}
