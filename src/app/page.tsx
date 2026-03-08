'use client';

import { Button } from "@/components";
import { AddNewTaskModal } from "@/components/modals/AddNewTaskModal";
import { useState } from "react";
import * as Dialog from '@radix-ui/react-dialog'
import { CalendarIcon, CheckboxIcon, Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Task } from "@/types/task.type";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup } from "@/components/ui/field";

export default function Home() {
  //const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [task, setTask] = useState([{}]);
  const [id, setId] = useState(1);

  const form = useForm({defaultValues: {task: "", id: 0}})

  const addNewTask = (data: Task) => {
    setTask([...task, {task: data.task, id: id}]);
    setId(id + 1);
  }

  const testData: Task[] = [
    {
      id: 1,
      task: 'Say hi to Fuzzy'
    },
    {
      id: 2,
      task: 'Say hi to Asa'
    },
    {
      id: 3,
      task: 'Eat an apple'
    }
  ]

  return (
    <div className="py-10">
      <div className="flex flex-col justify-center space-y-4">
        <FieldGroup>
          <Field 
            className="mx-auto max-w-sm rounded-md"
            orientation="horizontal">
            <Input
              className="bg-gray-100"
              placeholder="Add new task..."
            />
            <Button className="cursor-pointer bg-indigo-500 hover:bg-indigo-800">
              Add
            </Button>
          </Field>
        </FieldGroup>


        <div className="px-10">
          <div className="mx-auto max-w-sm space-y-4 rounded-lg bg-indigo-100 p-4">
            {testData.map((task) => (
              <SingleTask
                key={task.id}
                data={task}
              />
            ))}
          </div>
        </div>
        
        {/* <Dialog.Root>
          <Dialog.Trigger className="cursor-pointer mx-auto max-w-sm rounded-md 
            text-gray-800 bg-gray-200 p-2 hover:text-gray-500">
            Add Task
          </Dialog.Trigger>

          <div className="px-10">
            <div className="mx-auto max-w-sm space-y-4 rounded-lg bg-blue-200 p-4">
              {testData.map((task) => (
                <SingleTask
                  key={task.id}
                  data={task}
                />
              ))}
            </div>
          </div>
          
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50"/>
            <Dialog.Content className="fixed left-1/2 top-1/2 w-full 
              max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white 
              p-8 text-gray-900 shadow">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-sm font-medium leading-6 text-gray-900">
                  Add New Task
                </Dialog.Title>
                <Dialog.Close className="cursor-pointer text-gray-400 hover:text-gray-500">
                  <Cross1Icon />
                </Dialog.Close>
              </div>

              <TaskFields></TaskFields>

              <div className="mt-8 space-x-6 text-right">
                <Dialog.Close className="rounded px-4 py-2 text-sm font-medium
                text-gray-500 cursor-pointer hover:text-gray-600">
                  Cancel
                </Dialog.Close>
                <Dialog.Close className="rounded bg-green-500 px-4 py-2 text-sm
                font-medium text-white cursor-pointer hover:bg-green-600">
                  Save
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root> */}
      </div>
    </div>
  );
}

// function TaskFields(){
//   return (
//     <div className="space-y-6">
//       <div>
//         <Input className="mt-2" type="text">
//         </Input>
//       </div>
//     </div>
//   )
// }

function SingleTask({data}: {data: Task}) {
  return (
    <div className="flex justify-between rounded-lg bg-white px-4 py-4 text-gray-800">
      <div>
        <p>{data.task}</p>
      </div>
      <div>
        <button className="rounded p-2 cursor-pointer">
          <Pencil1Icon />
        </button>
        <Checkbox className="cursor-pointer" />
      </div>
    </div>
  )
}
function useForm(arg0: {}) {
  throw new Error("Function not implemented.");
}

