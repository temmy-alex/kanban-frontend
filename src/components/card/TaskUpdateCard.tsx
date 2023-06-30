import { useEffect, useState } from "react";
import { InputSingleField } from "../field/InputField";
import TextButton from "../button/TextButton";
import { LuPlusSquare, LuPencil } from "react-icons/lu";
import { toast } from "react-toastify";
import { HttpPost, HttpPut } from "../../configs/api";
import TaskDetailModal from "../modal/TaskDetailModal";

function TaskUpdateCard({ submit, taskId, title, description }: any) {
  const [titleField, setTitleField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");
  const [addTaskColumn, setAddTaskColumn] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTitleField(title);
    setDescriptionField(description);
  }, [addTaskColumn]);

  async function submitUpdate(){
    try {
        await HttpPut(`tasks/update/${taskId}`, {
            title: titleField,
            description: descriptionField
        });

        toast("Success Update Task");
        setAddTaskColumn(false);
        submit();
    } catch (error) {
        toast(error?.response?.data?.message);
    }
  }

  return (
    <div>
      {addTaskColumn ? (
        <div className="border rounded-lg p-2 border-white bg-white min-w-[220px] min-h-[120px]">
          <InputSingleField
            textColor={"black"}
            value={titleField}
            type={"text"}
            placeholder={"Title"}
            required={true}
            label={""}
            onChange={(e) => setTitleField(e.target.value)}
          />
          <InputSingleField
            textColor={"black"}
            value={descriptionField}
            type={"text"}
            placeholder={"Description"}
            required={true}
            label={""}
            onChange={(e) => setDescriptionField(e.target.value)}
          />
          <div className="flex gap-5 items-center mt-3">
            <TextButton
              title={"Submit"}
              onClick={() => submitUpdate()}
              loading={false}
            />
            <p
              className="text-xs cursor-pointer"
              onClick={() => setAddTaskColumn(false)}
            >
              Cancel
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg bg-black text-white p-2 my-2 flex">
          <div className="w-[250px]" onClick={() => setOpen(true)}>
            <p className="font-black text-sm">{title}</p>
            <p className="text-xs">{description}</p>
          </div>
          <div>
            <LuPencil
              size={15}
              color="white"
              className="cursor-pointer"
              onClick={() => setAddTaskColumn(true)}
            />
          </div>
        </div>
      )}

      <TaskDetailModal
        taskId={taskId}
        open={open}
        close={() => setOpen(false)}
        update={submit}
      />
    </div>
  );
}

export default TaskUpdateCard;
