# EmailJS Setup Guide for Esnaad Legal Website

## Overview

This guide will help you set up EmailJS to enable the contact form to send emails directly from the frontend without a backend server.

## What is EmailJS?

EmailJS is a service that allows you to send emails directly from JavaScript without any server-side code. It's perfect for static websites and frontend-only applications.

---

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click **Sign Up** (it's free for up to 200 emails/month)
3. Create an account using your email or Google account
4. Verify your email address

---

## Step 2: Add an Email Service

1. After logging in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook**
   - **Yahoo**
   - Or use a custom SMTP service

### For Gmail:

1. Select **Gmail**
2. Click **Connect Account**
3. Sign in with the Gmail account you want to use for receiving form submissions
4. Grant the necessary permissions
5. Give your service a name (e.g., "Esnaad Legal Forms")
6. Click **Create Service**
7. **Copy the Service ID** (you'll need this later)

### Important Gmail Settings:

- If using Gmail, make sure your account allows "Less secure app access" OR use App-specific passwords if you have 2FA enabled

---

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

### Template Content:

**Subject:**

```
طلب استشارة قانونية جديد من {{from_name}}
```

**Body (HTML Format):**

Switch to **HTML** mode in EmailJS template editor and paste this:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px;">
  <div>&nbsp;</div>
  <div
    style="margin-top: 20px; padding: 15px 0; border-width: 1px 0; border-style: dashed; border-color: lightgrey;"
  >
    <table style="width: 100%; max-width: 600px;" role="presentation">
      <tbody>
        <tr>
          <td style="vertical-align: top; width: 80px;">
            <div
              style="padding: 6px 10px; margin: 0 10px; background-color: aliceblue; border-radius: 5px; font-size: 26px;"
              role="img"
            >
              👤
            </div>
          </td>
          <td style="vertical-align: top;">
            <div style="color: #2c3e50; font-size: 16px;">
              <strong>اسم العميل: {{from_name}}</strong>
            </div>
            <div style="color: #2c3e50; font-size: 16px;">
              <div>
                <span style="font-size: 10pt;"
                  >البريد الإلكتروني: {{from_email}}</span
                >
              </div>
            </div>
            <div style="color: #2c3e50; font-size: 16px;">
              <div>
                <span style="font-size: 10pt;">رقم الهاتف: {{phone}}</span>
              </div>
            </div>
            <div style="color: #2c3e50; font-size: 16px;">
              <span style="font-size: 10pt;">نوع الاستشارة: {{service}}</span>
            </div>
            <div style="color: #999999; font-size: 13px;">
              <div>الوقت المفضل للاتصال: {{preferred_time}}</div>
            </div>
            <div
              style="margin-top: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 5px;"
            >
              <div
                style="color: #2c3e50; font-size: 14px; font-weight: bold; margin-bottom: 8px;"
              >
                تفاصيل الاستشارة:
              </div>
              <p
                style="font-size: 14px; color: #555; line-height: 1.6; margin: 0;"
              >
                {{message}}
              </p>
            </div>
            <div
              style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0; color: #999; font-size: 11px;"
            >
              تاريخ الإرسال: {{submission_date}}<br />
              تم إرسال هذا البريد من نموذج الاستشارة القانونية على موقع إسناد
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### Template Variables Mapping:

The form fields map to these EmailJS variables:

- `{{from_name}}` ← Full Name (fullName)
- `{{from_email}}` ← Email (email)
- `{{phone}}` ← Phone Number (phone)
- `{{service}}` ← Consultation Type (consultationType)
- `{{preferred_time}}` ← Preferred Time (preferredTime)
- `{{message}}` ← Details (details)
- `{{submission_date}}` ← Submission Date (submissionDate)

4. Click **Save**
5. **Copy the Template ID** (you'll need this later)

---

## Step 4: Get Your Public Key

1. Go to **Account** > **General** in the EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. **Copy the Public Key**

---

## Step 5: Configure the Website

Now you need to add your EmailJS credentials to the HTML file.

### Open `esnnad legal web page.html` and find these lines (around line 1041-1043):

```javascript
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY_HERE";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID_HERE";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID_HERE";
```

### Replace with your actual values:

```javascript
const EMAILJS_PUBLIC_KEY = "your_actual_public_key";
const EMAILJS_SERVICE_ID = "service_xxxxxxx";
const EMAILJS_TEMPLATE_ID = "template_xxxxxxx";
```

---

## Step 6: Set Your Receiving Email Address

**IMPORTANT:** You need to specify which email address should receive the form submissions.

### Find this line (around line 1068):

```javascript
to_email: "your-email@.com", // Your receiving email
```

### Replace with the email address where you want to receive form submissions:

```javascript
to_email: "esnaaduae@gmail.com", // Your receiving email
```

Or use your personal/business email:

```javascript
to_email: "yourname@yourdomain.com", // Your receiving email
```

**Note:** This email address will receive all consultation requests from the website form.

---

## Step 7: Test the Form

1. Open your website in a browser
2. Fill out the consultation form
3. Click submit
4. Check your email inbox (the one connected to EmailJS)
5. You should receive an email with the form data

---

## Troubleshooting

### Form submission fails:

- ✅ Check that all three IDs are correctly copied
- ✅ Make sure there are no extra spaces or quotes
- ✅ Check browser console (F12) for error messages
- ✅ Verify your EmailJS account is active

### Gmail-specific issues:

- ✅ Enable "Less secure app access" in Gmail settings
- ✅ Or create an App Password if using 2FA
- ✅ Check that you've granted all necessary permissions

---

## Free Tier Limits

EmailJS free tier includes:

- ✅ 200 emails per month
- ✅ 2 email services
- ✅ 2 email templates
- ✅ Standard support

For higher limits, check their [pricing page](https://www.emailjs.com/pricing/).

---
