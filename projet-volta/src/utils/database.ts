import sqlite3 from 'sqlite3';

// Chemin vers le fichier de base de données SQLite
const DB_PATH = 'path/vers/la/base/de/donnees.db';

// Créer une connexion à la base de données
const db = new sqlite3.Database(DB_PATH);

// Créer la table "alarms" si elle n'existe pas déjà
db.run(`
  CREATE TABLE IF NOT EXISTS alarms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    time TEXT,
    active INTEGER
  );
`);

// Fonction pour insérer une alarme dans la base de données
export const insertAlarm = (alarm: { time: string; active: boolean }): Promise<number> => {
  return new Promise((resolve, reject) => {
    const { time, active } = alarm;
    db.run(`INSERT INTO alarms (time, active) VALUES (?, ?)`, [time, active], function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

// Fonction pour récupérer toutes les alarmes de la base de données
export const getAllAlarms = (): Promise<{ id: number; time: string; active: boolean }[]> => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM alarms`, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};

// Fonction pour mettre à jour une alarme dans la base de données
export const updateAlarm = (alarm: { id: number; time: string; active: boolean }): Promise<void> => {
  return new Promise((resolve, reject) => {
    const { id, time, active } = alarm;
    db.run(`UPDATE alarms SET time = ?, active = ? WHERE id = ?`, [time, active, id], function (error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

// Fonction pour supprimer une alarme de la base de données
export const deleteAlarm = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM alarms WHERE id = ?`, [id], function (error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
