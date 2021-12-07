import React from 'react';
import { db } from './services/idb';
import { TasksMock } from './services/mockTasks';

// import { Container } from './styles';

const Online: React.FC = () => {

  const includeItemDb = async () => {
      await db.then((openDb) => {
          TasksMock.forEach(task => {
              openDb.add('tasks', {
                  idTask: task.idTask,
                  timestamp: task.timestamp,
                  activity: task.activity,
                  executed: false,
              })
          })
      })
  }

  return (
    <div className='default-page' style={{ display: 'flex', flexDirection: 'column' }}>
      <div>Online</div>
      <button style={{
        border: 'none',
        padding: 8,
        borderRadius: 8,
        marginTop: 6,
        cursor: 'pointer',
        backgroundColor: '#93aee0'
      }} onClick={() => includeItemDb()}>Carregar Tasks</button>
    </div>
  );
}

export default Online;