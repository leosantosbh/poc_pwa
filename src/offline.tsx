import React, { useEffect, useState } from 'react';
import TaskNotes from './editTask';
import { db, TasksProps } from './services/idb';

// import { Container } from './styles';

interface TaskSelectedProps {
  idTask: string;
  nameTask: string;
}

const Offline: React.FC = () => {
  const [list, setList] = useState<TasksProps[]>([]);
  const [taskSelected, setTaskSelected] = useState<TaskSelectedProps | undefined>()

  const listTasks = async () => {
    const listTemp = await (await db).getAll('tasks');

    setList(listTemp)
  }

  useEffect(() => {
    listTasks();
  }, [])

  const seletcTaks = (idTask: string, nameTask: string) => {
    setTaskSelected({
      idTask,
      nameTask
    });
  }

  const backNote = () => {
    setTaskSelected(undefined);

    listTasks();
  }

  return (
    <div className='default-page'>
      {taskSelected ? (
        <TaskNotes idTask={taskSelected.idTask} nameTask={taskSelected.nameTask} onBack={() => backNote()} />
      ) : (
        list.length > 0 ? (
          <div className='listTaks'>
            {list.map(task => (
              <button className="task" key={task.idTask} onClick={() => seletcTaks(task.idTask!, task.activity)}>
                <span className="nameTask">{task.activity}</span>
                <div className="statusTask" style={{ backgroundColor: task.executed ? 'green' : 'red' }} />
              </button>
            ))}
          </div>
        ) : (
          <div>Lista Vazia</div>
        )
      )}
    </div>
  );
}

export default Offline;