import Expo, { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

export default db;