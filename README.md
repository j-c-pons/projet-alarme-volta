# projet-alarme-volta


# Environnement de test:
 Windows 11
 Python 3.10.1
 Pip 23.1.2
 React 18.2.0
 Npm 8.1.2
 Navigateurs: Chrome, Firefox



# Côté back:

# Create Virtual Environment
python3 -m venv venv

# lancer l'evt virtuel:

<!-- venv\Scripts\activate.bat -->
<!-- env\Scripts\activate (macos/unix) -->

venv/bin/activate (mac os/unix)
.\env\Scripts\Activate.ps1 (windows)
pip install -r requirements.txt

# lancer l'api:
 uvicorn main:app --reload
 https://kinsta.com/fr/blog/fastapi/


 <!-- pip install "fastapi[all]"
 pip instal uvicorn
 pip install sqlite3 -->

# Côté front:
npm install 
npm start
