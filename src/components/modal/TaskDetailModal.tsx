import { useEffect, useState } from "react";
import { InputSingleField } from "../field/InputField";
import { DropdownField } from "../field/DropdownField";
import axios from "axios";
import { TextAreaField } from "../field/TextAreaField";
import { toast } from "react-toastify";
import { HttpGet, HttpPost, HttpPut } from "../../configs/api";
import { LuPlusSquare } from "react-icons/lu";
import { MdOutlineAccountCircle, MdClose } from "react-icons/md";
import TextButton from "../button/TextButton";
import AssignModal from "./AssignModal";

function TaskDetailModal({ open, taskId, close, update }) {
  const [task, setTask] = useState(null);
  const [descriptionField, setDescriptionField] = useState("");
  const [addSubTask, setAddSubTask] = useState(false);

  const [commentField, setCommentField] = useState("");

  const [openAssign, setOpenAssign] = useState(false);
  const [subId, setSubId] = useState(0);

  async function getDetail() {
    try {
      let res = await HttpGet(`tasks/${taskId}`);

      console.log(res);
      setTask(res.detail);
    } catch (error) {
      toast(error?.response?.data?.message);
    }
  }

  async function submitSubTask() {
    try {
      await HttpPost("subtasks", {
        description: descriptionField,
        taskId: taskId,
      });

      setDescriptionField("");
      setAddSubTask(false);
      getDetail();
    } catch (error) {
      toast(error?.response?.data?.message);
    }
  }

  async function updateSubTask({ id }) {
    try {
      await HttpPut(`/subtasks/status/${id}`, null);

      getDetail();
    } catch (error) {}
  }

  async function updateTaskStatus({ id }) {
    try {
      await HttpPut(`tasks/update-category/${id}`, {
        category: task?.categoryId + 1,
      });

      getDetail();
      update();
    } catch (error) {}
  }

  async function submitComment() {
    try {
      await HttpPost("comments", {
        description: commentField,
        taskId: taskId,
        subId: null,
      });

      setCommentField("");
      getDetail();
    } catch (error) {
      toast(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    if (open) getDetail();
  }, [open]);

  return (
    <div
      className={`fixed ${
        open ? "" : "hidden"
      } z-40 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
    >
      <div className="relative top-20 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
        <div className="w-full">
          <MdClose
            color="black"
            className="ml-auto cursor-pointer"
            onClick={() => close()}
          />
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl leading-6 font-medium text-gray-900">
                {task?.title}
              </h3>
              <div className="mt-2 py-3">
                <p className="text-md text-gray-500">{task?.description}</p>
              </div>
            </div>
            {/* <MdOutlineAccountCircle size={35} color="black" /> */}
            <div
              className="rounded p-2 bg-green-500 capitalize text-end"
              onClick={() => updateTaskStatus({ id: taskId })}
            >
              <p className="italic text-white text-center">
                {task?.category?.title}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-medium text-md">Subtask:</p>
            <ul className="list-disc pl-4">
              {task?.subtasks
                ?.sort((a, b) => {
                  return a.id - b.id;
                })
                .map((data) => {
                  return (
                    <li
                      className={`text-base text-gray-500 my-2 cursor-pointer ${
                        data?.status ? "line-through" : ""
                      }`}
                    >
                      <div className="flex gap-4 justify-between items-center">
                        <p onClick={() => updateSubTask({ id: data?.id })}>
                          {data.description}
                        </p>{" "}
                        {data?.assignId ? (
                          <div
                            onClick={() => {
                              setSubId(data.id);
                              setOpenAssign(true);
                            }}
                            className={`flex relative w-10 h-10 justify-center items-center text-sm rounded-full text-white bg-black`}
                          >
                            <p>{`${data?.assignTo?.personal?.name[0]}`}</p>{" "}
                          </div>
                        ) : (
                          <MdOutlineAccountCircle
                            size={40}
                            color="black"
                            onClick={() => {
                              setSubId(data.id);
                              setOpenAssign(true);
                            }}
                          />
                        )}
                      </div>
                      <AssignModal
                        open={openAssign}
                        close={() => {
                          setOpenAssign(false);
                          getDetail();
                        }}
                        subtaskId={subId}
                      />
                    </li>
                  );
                })}
            </ul>
            {addSubTask ? (
              <div className="border rounded-lg p-2 border-white bg-gray-300 h-[120px]">
                <InputSingleField
                  textColor={"black"}
                  value={descriptionField}
                  type={"text"}
                  placeholder={"Task Description"}
                  required={true}
                  label={""}
                  onChange={(e) => setDescriptionField(e.target.value)}
                />
                <div className="flex gap-5 items-center mt-3">
                  <TextButton
                    title={"Submit"}
                    onClick={() => submitSubTask()}
                    loading={false}
                  />
                  <p
                    className="text-xs text-black cursor-pointer"
                    onClick={() => setAddSubTask(false)}
                  >
                    Cancel
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="border rounded-lg p-2 border-black mt-2 w-[200px] items-center flex justify-center cursor-pointer"
                onClick={() => setAddSubTask(true)}
              >
                <LuPlusSquare size={15} color="black" />
                <p className="text-xs ml-3 text-black">Add Another Category</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <p className="font-medium text-md">Comments:</p>
            <div>
              {task?.comments?.map((data) => {
                let currentName = data?.account?.personal?.name.split(" ");

                return (
                  <div className="text-base rounded-lg bg-gray-200 text-gray-500 my-2 flex gap-4 p-3 justify-between items-center">
                    <p>{data.description}</p>{" "}
                    <div
                      className={`flex relative w-10 h-10 justify-center items-center text-sm rounded-full mx-6 text-white bg-black`}
                    >
                      <p>{`${currentName[0][0]}${
                        currentName[1] ? currentName[1][0] : ""
                      }`}</p>{" "}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border rounded-lg mt-2 border-white bg-gray-300 py-2 px-4  h-[120px]">
              <InputSingleField
                textColor={"black"}
                value={commentField}
                type={"text"}
                placeholder={"Comment"}
                required={true}
                label={""}
                onChange={(e) => setCommentField(e.target.value)}
              />
              <div className="flex gap-5 items-center mt-3">
                <TextButton
                  title={"Submit"}
                  onClick={() => submitComment()}
                  loading={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailModal;
