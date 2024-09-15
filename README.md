# Kuick Share

**Kuick Share** is a secure web platform designed for quickly storing and sharing links or text with end-to-end encryption. Whether you need to share sensitive information or just a simple link, Kuick Share ensures your data is protected and can be set to expire automatically based on your preferences.

## Features

- 🔐 **AES-256 Encryption**: All shared data is securely encrypted to protect sensitive information.
- ⏳ **Expiration Management**: Users can set expiration times for stored entries, ensuring content auto-deletes after a specified period.
- ⚡ **Quick Access**: Easily store and retrieve content from anywhere, even without a messaging app.
- 🌍 **End-to-End Encryption**: Your data remains protected from the moment it’s uploaded until it’s accessed.
- 📜 **Simple Retrieval**: Share links with others for easy access to stored content.
- 🔄 **Automated Expiry with Cron Jobs**: Automatic deletion of expired content using scheduled cron jobs.

## Tech Stack

- **Frontend & Backend**: Built with **Next.js** for seamless user experience.
- **Database**: **MongoDB** for scalable, efficient data storage.
- **Encryption**: Utilizes **AES-256** encryption for data protection.
- **Cron Jobs**: Handles link expiration and automated data deletion.

## Installation & Usage

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up environment variables for encryption key, database, etc.
4. Run the application with `npm run dev`

## Contribute

Feel free to contribute to the project by forking the repository and submitting pull requests!
