import { Task } from "@/types/task.type";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";

export function AddNewTaskModal({open}: {open: boolean}){
  const [form, setForm] = useState<Task>({
    task: ''
  })

  return (
    <Dialog open={open}>
      <DialogContent>
        {/* <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader> */}
      </DialogContent>
    </Dialog>
  )
}
