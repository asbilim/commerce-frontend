import { toast } from "sonner";

export async function registerUser({ username, email, password1, password2 }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/registration/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password1, password2 }),
      }
    );

    const data = await response.json();

    if (response.status === 201) {
      return { success: true, message: "Verification e-mail sent." };
    }

    if (response.status === 400) {
      return { success: false, errors: data };
    }

    throw new Error("Something went wrong. Please try again.");
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function resendVerificationEmail(email) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/registration/resend-email/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (response.ok) {
      toast.success("Verification email resent successfully.");
    } else {
      const errorData = await response.json();
      toast.error(errorData?.detail || "Failed to resend verification email.");
    }
  } catch (error) {
    toast.error("Something went wrong. Please try again later.");
  }
}
