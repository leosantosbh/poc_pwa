import { DBSchema, openDB } from 'idb';

export interface NotesTasks {
  id: string;
  note: string;
  internal: boolean;
  timestamp: number;
}

export interface ImageProps {
  idTask: string;
  idImage: string;
  base64: string;
}

export interface TasksProps {
  task?: string;
  idTask?: string;
  timestamp: number;
  activity: string;
  executed: boolean;
  notes?: NotesTasks[];
}

interface TasksDB extends DBSchema {
  tasks: {
    value: TasksProps;
    key: string;
    indexes: { 'id': string };
  };
}

interface ImageDB extends DBSchema {
  imagesTask: {
    value: ImageProps;
    key: string;
    indexes: { 'idTask': string };
  };
}

export const db = openDB<TasksDB>('Tasks', 1, {
    async upgrade(db) {
        const store = db.createObjectStore('tasks', {
            keyPath: 'task',
            autoIncrement: true,
        })
        store.createIndex('id', 'idTask')
    }
})

export const dbImage = openDB<ImageDB>('Images', 1, {
  async upgrade(db) {
      const store = db.createObjectStore('imagesTask', {
          keyPath: 'image',
          autoIncrement: true,
      })
      store.createIndex('idTask', 'idTask')
  }
})