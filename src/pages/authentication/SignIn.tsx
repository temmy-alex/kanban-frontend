import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputSingleField } from "../../components/field/InputField";
import TextButton from "../../components/button/TextButton";
import { BsChevronCompactLeft } from "react-icons/bs";
import { HttpPost } from "../../configs/api";
import { toast } from "react-toastify";

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) navigate("/");
  }, []);

  async function submit() {
    setLoading(true);

    try {
      let data = {
        email,
        password,
      };

      let res = await HttpPost("auths/login", data);

      localStorage.setItem("accessToken", res.accessToken);

      setLoading(false);
      navigate("/");
    } catch (error) {
      toast(error?.response?.data?.message);
      setLoading(false);
    }
  }

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="max-w-[550px] p-10 border bg-white rounded pb-8 px-3 w-full">
        <InputSingleField
          textColor={"black"}
          value={email}
          type={"email"}
          placeholder={""}
          required={true}
          label={"Email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="my-4">
          <InputSingleField
            textColor={"black"}
            value={password}
            type={"password"}
            placeholder={""}
            required={true}
            label={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <TextButton
            title={"Sign In"}
            onClick={() => submit()}
            loading={loading}
          />
        </div>
        <p className="text-xs text-center text-black my-2">
          Tidak memiliki akun ?{" "}
          <span
            className="hover:text-[#07638d] font-bold"
            onClick={() => navigate("/auths/sign-up")}
          >
            Daftar
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;
