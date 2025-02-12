# Running the Application

This guide explains how to set up and run the application on both Linux and Windows.

## Prerequisites

Before running the application, ensure you have the following installed:

- **MongoDB**: Required for storing data.
- **Python 3**: Needed for running the Flask API.
- **Node.js & npm**: Required for running the React Native app.
- **Expo CLI**: Used for managing and running the mobile application.

## Running the Application on Linux

1. **Ensure MongoDB is installed and enabled**:
   ```bash
   sudo systemctl start mongod
   ```
2. **Run the provided Bash script**:
   ```bash
   chmod +x start.sh
   ./run_app.sh
   ```
3. **Follow the prompt to enter your OpenAI API key**.
4. **The application should start, and you can access it via:**
   - **Web**: [http://localhost:8081](http://localhost:8081)
   - **Mobile**: Scan the QR code in the terminal using the Expo mobile app.

## Running the Application on Windows

1. **Ensure MongoDB is installed and running**:
   - Open Command Prompt as Administrator and run:
     ```cmd
     NET START MongoDB
     ```
2. **Run the provided batch script**:
   - Double-click `start.bat` or run it in Command Prompt:
     ```cmd
     run_app.bat
     ```
3. **Follow the prompt to enter your OpenAI API key**.
4. **The application should start, and you can access it via:**
   - **Web**: [http://localhost:8081](http://localhost:8081)
   - **Mobile**: Scan the QR code in the terminal using the Expo mobile app.

## Additional Notes

- If you encounter any issues, ensure all dependencies are correctly installed.
- For mobile access, download the **Expo Go** app from the Play Store or App Store.
- Make sure your phone and computer are on the same network when scanning the QR code.


