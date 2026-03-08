import { Status } from './status.type';

export interface Task {
  id: number;
  task: string;
  status?: Status;

  // can add due date, priority, sub tasks etc
}