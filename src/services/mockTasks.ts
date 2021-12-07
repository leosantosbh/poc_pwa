import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';

export const TasksMock = Array(6)
    .fill(0)
    .map((_v, i) => ({
        idTask: uuidv4(),
        timestamp: new Date(faker.date.recent()).getTime(),
        activity: faker.random.words(5)
    }));