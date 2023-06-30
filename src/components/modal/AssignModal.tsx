import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { SearchField } from "../field/SearchField";
import { toast } from "react-toastify";
import { HttpPost } from "../../configs/api";
import TextButton from "../button/TextButton";

function AssignModal({ open, subtaskId, close }) {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [searchMode, setSearchMode] = useState(false);

  async function getUsers() {
    try {
      let res = await HttpPost(`users`, {
        name: search,
      });

      setUsers(res.list);
    } catch (error) {
        toast(error?.response?.data?.message);
    }
  }

  async function assignUser() {
    try {
      await HttpPost(`subtasks/assign/${subtaskId}`, {
        accountId: user?.id,
      });

      reset();
      close();
    } catch (error) {
      toast(error.message);
    }
  }

  function reset() {
    setUser("");
    setSearch("");
    setUsers([]);
    setSearchMode(false);
  }

  useEffect(() => {
    if (open) getUsers();
  }, [search]);

  useEffect(() => {
    if (open) reset();
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
        <p className="text-center font-bold mb-3">Assign People</p>
        <SearchField
          search={search}
          onChange={(e: any) => {
            setSearchMode(true);
            setSearch(e.target.value);
          }}
          placeholder={"User"}
          type={"text"}
          selectedValue={user}
          collectionList={users}
          valueListField={"name"}
          keyListField={"id"}
          labelListField={"name"}
          clicked={(e) => {
            setSearchMode(false);
            setUser(e);
          }}
          searchMode={searchMode}
        />
        <div className="mt-3">
          <TextButton
            title={"Submit"}
            onClick={() => assignUser()}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}

export default AssignModal;
