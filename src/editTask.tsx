/* eslint-disable react-hooks/exhaustive-deps */
import faker from 'faker';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import CameraView from './camera';
import { db, dbImage, ImageProps, NotesTasks, TasksProps } from './services/idb';

// import { Container } from './styles';

export interface TaskNotesProps {
  idTask: string;
  nameTask: string;
  onBack: () => void;
}

const TaskNotes: React.FC<TaskNotesProps> = ({ idTask, nameTask, onBack }) => {
  const [notes, setNotes] = useState<NotesTasks[]>([]);
  const [takePicture, setTakePicture] = useState(false);
  const [dataTask, setDataTask] = useState<TasksProps>();
  const [images, setImages] = useState<ImageProps[]>([]);

  useEffect(() => {
    listValuesTask();
  }, [])

  const onFinish = async () => {
    if (dataTask) {
      (await db).put('tasks', {
        ...dataTask,
        executed: true
      })

      onBack()
    }
  }

  const addNote = async () => {
    if (dataTask) {
      const noteTemp: NotesTasks[] = [...notes];
      noteTemp.push({
        id: uuid(),
        note: faker.random.words(17),
        internal: faker.datatype.boolean(),
        timestamp: new Date(faker.date.recent()).getTime(),
      });

      (await db).put('tasks', {
        ...dataTask,
        notes: noteTemp
      })

      setDataTask({
        ...dataTask,
        notes: noteTemp
      })
      setNotes(noteTemp);
    }

  }

  const addPicture = async (camera: boolean, file?: any) => {
    if (camera) {
      const imagesTemp = [...images];
      const imageTemp = {
        idTask: idTask,
        idImage: uuid(),
        base64: file,
      }

      await (await dbImage).add('imagesTask', imageTemp)

      imagesTemp.push(imageTemp)
      
      setImages(imagesTemp);
      setTakePicture(false);
    } else {
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (e) =>{
          if (e && e.target) {
            const newPictureURI = e.target.result as string;
            const imagesTemp = [...images];
            const imageTemp = {
              idTask: idTask,
              idImage: uuid(),
              base64: newPictureURI as string
            }

            await (await dbImage).add('imagesTask', imageTemp)

            imagesTemp.push(imageTemp)
            
            setImages(imagesTemp);
          }
        };
      }
    }
  }

  const listValuesTask = async () => {
    const notesTemp = await (await db).getFromIndex('tasks', 'id', idTask);

    setDataTask(notesTemp);
    if (notesTemp && notesTemp.notes) {
      setNotes(notesTemp.notes);
    }

    const imagesTemp = await (await dbImage).getAllFromIndex('imagesTask', 'idTask', idTask);
    if (imagesTemp) {
      setImages(imagesTemp);
    }
  }

  return takePicture ? (
    <CameraView onPhoto={photo => {
      addPicture(true, photo);
    }} />
  ) : (
    <div className='form-note'>
      <div className='titleNote'>
        <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => onBack()}><i className="arrow left"/></button>
        <span className="nameTask">{nameTask}</span>
      </div>

      <div className='buttonsAdd'>
        {dataTask && !dataTask.executed && (
          <>
            <button onClick={() => addNote()} style={{ backgroundColor: '#cf8939' }}>Add Note</button>

            <input
              style={{ display: 'none' }}
              id='newPictureSelected'
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) addPicture(false, e.target.files[0])
              }}
            />
            <button onClick={() => document.getElementById('newPictureSelected')!.click()} style={{ backgroundColor: '#395ccf' }}>Add Picture</button>
            <button onClick={() => setTakePicture(true)} style={{ backgroundColor: '#57cf39' }}>Take pictures</button>
            <button onClick={() => onFinish()} style={{ backgroundColor: '#cf3939' }}>Finish</button>
          </>
        )}
      </div>

      <div className='notes'>
        {notes.length > 0 && notes.map(note => (
          <div className='note' key={note.id}>
            <div className='desc-note'>{note.note}</div>
            <div className="statusTask" style={{ backgroundColor: note.internal ? 'green' : 'red' }} />
          </div>
        ))}
      </div>

      <div className='images'>
        {images.length > 0 && images.map((image, index) => (
          <div className='image' key={image.idImage}>
            <img src={image.base64} alt={`${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskNotes;