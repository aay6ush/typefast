import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined");
}

if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is not defined");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.FRONTEND_URL}/auth/verification?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    subject: "Verify your TypeFast account",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify your TypeFast account</title>
        </head>
        <body style="background-color: #171717; color: #e5e5e5; font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: rgba(23, 23, 23, 0.5); border: 1px solid #404040; border-radius: 8px; padding: 32px; margin: 20px;">
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 16px;">
                Welcome to TypeFast
              </h1>
              <p style="color: #a3a3a3; font-size: 16px; line-height: 24px; text-align: center; margin-bottom: 24px;">
                Thanks for signing up! Please verify your email address to get started.
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${confirmLink}" 
                   style="display: inline-block; background-color: #34D399; color: #e5e5e5; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; transition: background-color 0.2s;">
                  Verify Email Address
                </a>
              </div>
              <p style="color: #737373; font-size: 14px; text-align: center; margin-top: 24px;">
                If you didn't create an account, you can safely ignore this email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    to: email,
  });
};
