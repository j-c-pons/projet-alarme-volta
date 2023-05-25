### projet-alarme-volta


## Environnement de développement

* Windows 11
* Python 3.10.1
* Pip 23.1.2
* React 18.2.0
* Npm 8.1.2


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


## A finir/ améliorer
* Design à améliorer dans l'ensemble
* A faire : rendre le rappel/répétition d'alarme persistant, ajouter plus de sonneries, ajout d'un chronomètre/minuteur
* Côté serveur: je n'ai pas eu le temps de le travailler, il y a beaucoup de choses qui manquent (ORM, gestion d'erreurs, documentation, etc)

<!-- https://github.com/dmfilipenko/timezones.json/blob/master/timezones.json -->