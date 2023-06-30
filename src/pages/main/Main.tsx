import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { HttpGet, HttpPost } from "../../configs/api";
import { LuPlusSquare, LuPencil } from "react-icons/lu";
import TextButton from "../../components/button/TextButton";
import { InputSingleField } from "../../components/field/InputField";
import TaskCard from "../../components/card/TaskCard";
import TaskUpdateCard from "../../components/card/TaskUpdateCard";

function Dashboard() {
  const [category, setCategory] = useState([]);
  const [tasks, setTasks] = useState([]);
  // Add Category
  const [categoryField, setCategoryField] = useState("");
  const [addCategoryColumn, setAddCategoryColumn] = useState(false);

  // Add Task
  const [titleField, setTitleField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");
  const [addTaskColumn, setAddTaskColumn] = useState(false);
  const location = useLocation();

  // Function List
  async function getCategory() {
    try {
      let res = await HttpGet("categories");

      setCategory(res.list);
    } catch (error) {
      toast(error.message);
    }
  }

  async function getTask() {
    try {
      let list = [];

      for (let data of category) {
        let res = await HttpGet(`tasks/category/${data.id}`);
        list.push(res.list);
      }

      setTasks(list);
    } catch (error) {
      toast(error.message);
    }
  }

  async function submitCategory() {
    try {
      await HttpPost("categories", {
        title: categoryField,
        color: "#ffffff",
      });

      setCategoryField("");
      setAddCategoryColumn(false);
      getCategory();
    } catch (error) {
      toast(error.message);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (category.length > 0) getTask();
  }, [category]);

  return (
    <div className="p-4 flex gap-4 overflow-auto">
      {category
        ?.sort((a, b) => {
          return a.id - b.id;
        })
        .map((data, i) => {
          return (
            <div
              className={`bg-white p-3 min-w-[300px] rounded-lg h-fit`}
              key={data.id}
            >
              <p className="font-bold text-lg">{data.title}</p>
              {tasks[i]?.map((data: any) => {
                return (
                  <TaskUpdateCard
                    taskId={data.id}
                    title={data.title}
                    description={data.description}
                    submit={() => getTask()}
                  />
                );
              })}
              <TaskCard submit={() => getTask()} categoryId={data.id} />
            </div>
          );
        })}
      {addCategoryColumn ? (
        <div className="border rounded-lg p-2 border-white bg-white w-[220px] h-[120px]">
          <InputSingleField
            textColor={"black"}
            value={categoryField}
            type={"text"}
            placeholder={"Category"}
            required={true}
            label={""}
            onChange={(e) => setCategoryField(e.target.value)}
          />
          <div className="flex gap-5 items-center mt-3">
            <TextButton
              title={"Submit"}
              onClick={() => submitCategory()}
              loading={false}
            />
            <p
              className="text-xs cursor-pointer"
              onClick={() => setAddCategoryColumn(false)}
            >
              Cancel
            </p>
          </div>
        </div>
      ) : (
        <div
          className="border rounded-lg p-2 border-white h-[50px] min-w-[200px] items-center flex justify-center cursor-pointer"
          onClick={() => setAddCategoryColumn(true)}
        >
          <LuPlusSquare size={25} color="white" />
          <p className="text-sm ml-3 text-white">Add Another Category</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
