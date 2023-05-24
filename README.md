### projet-alarme-volta


## Environnement de test

Windows 11
Python 3.10.1
Pip 23.1.2
React 18.2.0
Npm 8.1.2
Navigateurs: Chrome, Firefox



## Côté back

Pré-requis: Python, pip et venv

# Créer l'environnement virtuel

```
cd projet-alarme-volta/projet-back
python3 -m venv venv
```

# Lancer l'evt virtuel

Windows (powershell)
```
env\Scripts\activate 
```

Mac os/Unix (bash)
```
venv/bin/activate
```

# Installer les paquets du projet

```
pip install -r requirements.txt
```

# Lancer le serveur
```
uvicorn main:app --reload
```


## Côté front

# Installer les paquets
```
cd projet-alarme-volta/projet-front
npm install 
```

# Lancement
Via electron
```
npm run dev
```

Via un navigateur
```
npm start
```

## A finir/ améliorer

<!-- https://github.com/dmfilipenko/timezones.json/blob/master/timezones.json -->