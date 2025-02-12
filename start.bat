@echo off

:: Start MongoDB
NET START MongoDB

:: Check if MongoDB started successfully
timeout /t 5 >nul
sc query MongoDB | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo Failed to start MongoDB. Exiting.
    exit /b 1
)

echo MongoDB started successfully.

:: Navigate to the API folder and start the Flask API
cd /d %~dp0\api || (echo API folder not found! Exiting. & exit /b 1)

:: Prompt for OpenAI Key
set /p OPENAI_API_KEY="Enter your OpenAI API key: "
setx OPENAI_AOI_KEY "%OPENAI_API_KEY%"

:: Create and activate virtual environment if not already active
if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate.bat

:: Install dependencies
pip install -r requirements.txt

:: Run the Flask API
start /b python run.py

:: Navigate to the mobile app folder and start the React Native app
cd /d %~dp0\mobile-app || (echo Mobile app folder not found! Exiting. & exit /b 1)

:: Start the Expo server
start /b cmd /c "npx expo start"

echo Application started successfully!
pause

