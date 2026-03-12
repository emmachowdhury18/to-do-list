'use client';

import { Button } from "@/components";
import { useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { Input } from "@/components/ui/input";
import { Task } from "@/types/task.type";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Pencil1Icon } from "@radix-ui/react-icons";

const formSchema = z.object({
  task: z.string(),
  id: z.number(),
  completed: z.boolean()
});

const defaultValues = {task: "", id: 0, completed: false};

export default function Home() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [id, setId] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  function onAddNewTask(data: Task) {
    if (!data.task){
      return;
    }
    setAllTasks([...allTasks, {task: data.task, id: id, completed: false}]);
    setId(id + 1);
    form.reset(defaultValues);
  }

  async function handleCheckClick(id: number) {
    const newTasks = allTasks.slice();
    let index = newTasks.findIndex(task => task.id === id);
    newTasks[index].completed = !newTasks[index].completed;
    setAllTasks(newTasks);
  }

  async function handlePencilClick(id: number, e: string) {
    const newTasks = allTasks.slice();
    let index = newTasks.findIndex(task => task.id === id);
    newTasks[index].task = e;
    setAllTasks(newTasks);
  }

  return (
    <div className="py-10">
      <div className="flex flex-col justify-center space-y-4">
        <form id="add-new-task-form"
          onSubmit={form.handleSubmit(onAddNewTask)}>
          <FieldGroup>
            <Controller
              name="task"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field 
                  className="mx-auto max-w-sm rounded-md"
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    className="bg-gray-100"
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Add new task..."
                    autoComplete="off"
                  />
                  <Button  
                    type="submit" 
                    form="add-new-task-form"
                    className="cursor-pointer bg-indigo-500 hover:bg-indigo-800">
                    Add
                  </Button>
                </Field>
              )}
            />
          </FieldGroup>
        </form>


        <div className="px-10">
          <div className="mx-auto max-w-sm space-y-4 rounded-lg bg-indigo-100 p-4">
            {allTasks.sort((a, b) => Number(a.completed) - Number(b.completed)).map((task) => (
              <SingleTask
                key={task.id}
                data={task}
                onCheckClick={() => handleCheckClick(task.id)}
                onPencilClick={(e) => handlePencilClick(task.id, e)}
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

function SingleTask({data, onCheckClick, onPencilClick }: {data: Task, onCheckClick: () => {}, onPencilClick: (data: string) => {}}) {
  return (
    <div className="flex justify-between rounded-lg bg-white px-4 py-4 text-gray-800">
      <div>
        {data.completed ? 
        (
          <p className="line-through">{data.task}</p>
        ) : (
          <input
            type="text"
            value={data.task}
            onChange={(e) => onPencilClick(e.target.value)}
          />
        )}
      </div>
      <div>
        {/* <button 
          className="rounded p-2 cursor-pointer"
          onClick={onPencilClick}
          disabled={data.completed}>
          <Pencil1Icon />
        </button> */}
        <Checkbox 
          className="cursor-pointer" 
          checked={data.completed}
          onCheckedChange={onCheckClick}
        />
      </div>
    </div>
  )
}

