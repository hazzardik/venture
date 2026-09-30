# BIZONIQ Auth email templates

Prepared for Supabase Auth. The templates use Supabase Go-template variables and the user's `user_metadata.language` to switch between RU and EN.

## Subjects

- Confirm sign up: **BIZONIQ — подтверди email / Confirm your email**
- Reset password: **BIZONIQ — восстановление доступа / Reset your password**
- Invite user: **Тебя пригласили в BIZONIQ / You’re invited to BIZONIQ**
- Change email address: **BIZONIQ — подтверди новую почту / Confirm your new email**
- Magic link: **BIZONIQ — ссылка для входа / Your sign-in link**
- Reauthentication: **BIZONIQ — код подтверждения / Verification code**

## Free SMTP setup with a dedicated Gmail account

Create a separate Gmail account for the project (for example, any available address that clearly belongs to BIZONIQ). Do not use a personal mailbox.

1. Enable 2-Step Verification on that Google account.
2. Create an App Password for mail.
3. In Supabase Dashboard open Authentication → SMTP Settings.
4. Enable custom SMTP and use:
   - Sender name: `BIZONIQ`
   - Sender email: your dedicated Gmail address
   - Host: `smtp.gmail.com`
   - Port: `587` with STARTTLS (or 465 with SSL if the dashboard requires SSL)
   - Username: full Gmail address
   - Password: Google App Password, not the normal Gmail password.
5. Keep email tracking disabled if your mail provider offers it, because rewriting auth links can break confirmation links.
6. Never put the Gmail App Password in GitHub or frontend code.

Without custom SMTP the branded HTML can still be used in Supabase Auth templates, but the visible sender may still be Supabase's default sender.

## Files

- confirmation.html
- recovery.html
- invite.html
- email-change.html
- magic-link.html
- reauthentication.html
