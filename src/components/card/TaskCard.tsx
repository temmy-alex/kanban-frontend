import { useEffect, useState } from "react";
import { InputSingleField } from "../field/InputField";
import TextButton from "../button/TextButton";
import { LuPlusSquare } from "react-icons/lu";
import { toast } from "react-toastify";
import { HttpPost } from "../../configs/api";

function TaskCard({ submit, categoryId }: any) {
  const [titleField, setTitleField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");
  const [addTaskColumn, setAddTaskColumn] = useState(false);

  async function create() {
    try {
      await HttpPost("tasks", {
        title: titleField,
        description: descriptionField,
        category: categoryId,
      });

      setAddTaskColumn(false);
      submit();
    } catch (error) {
      toast(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    setTitleField("");
    setDescriptionField("");
  }, [addTaskColumn]);
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
              onClick={() => create()}
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
        <div
          className="flex items-center mt-4 cursor-pointer"
          onClick={() => setAddTaskColumn(true)}
        >
          <LuPlusSquare size={25} color="black" />
          <p className="text-sm ml-3">Add a task</p>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
