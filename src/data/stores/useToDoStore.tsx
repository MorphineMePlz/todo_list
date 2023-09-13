import create, { State, StateCreator } from "zustand";
import { generateId } from "../helpers";
import { devtools } from "zustand/middleware";

interface Task {
  id: string;
  title: string;
  createdAt: number;
  checked: boolean;
}

interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (title: string, id: string) => void;
  removeTask: (id: string) => void;
}

const isTodoStore = (object: any): object is ToDoStore => {
  return "tasks" in object;
};

const localStorageUpdate =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (nextState, ...args) => {
        if (isTodoStore(nextState)) {
          window.localStorage.setItem("tasks", JSON.stringify(nextState.tasks));
        }
        set(nextState, ...args);
      },
      get,
      api
    );

const currentState = JSON.parse(
  window.localStorage.getItem("tasks") || "[]"
) as Task[];

export const useToDoStore = create<ToDoStore>(
  localStorageUpdate(
    devtools((set, get) => ({
      tasks: currentState,

      createTask: (title: string) => {
        const { tasks } = get();
        const newTask = {
          id: generateId(),
          title: title,
          createdAt: Date.now(),
          checked: false,
        };

        set({
          tasks: [newTask].concat(tasks),
        });
      },
      updateTask: (title: string, id: string) => {
        const { tasks } = get();
        set({
          tasks: tasks.map((task) => ({
            ...task,
            title: task.id === id ? title : task.title,
          })),
        });
      },

      removeTask: (id: string) => {
        const { tasks } = get();
        set({
          tasks: tasks.filter((task) => task.id !== id),
        });
      },
    }))
  )
);
