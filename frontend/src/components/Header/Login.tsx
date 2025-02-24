import Link from "next/link";
import CustomImage from "@components/CustomImage";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "react-bootstrap";
import { redirect, useSearchParams } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(res);
    if (res?.url) {
      redirect(res.url);
    }

    if (res?.error) {
      setError("User not found.");
    }

    setLoading(false);
  };

  return (
    <form className="right" onSubmit={handleSubmit}>
      <h4 className="title">เข้าสู่ระบบ</h4>

      <div className="mb-3">
        <label htmlFor="email" className="form-label font2">
          อีเมล
        </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="form-control font2"
          id="email"
          required
        />
      </div>

      <div className="mb-3">
        <div className="forgotpass">
          <label htmlFor="password" className="form-label font2">
            รหัสผ่าน
          </label>
          <span data-bs-toggle="modal" data-bs-target="#modalforgot">
            ลืมรหัสผ่าน?
          </span>
        </div>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="form-control"
          id="password"
          required
        />
      </div>
      <div className="mb-1">
        <span className="text-danger h6">{error}</span>
      </div>
      <Button
        variant="primary"
        className="font2"
        type="submit"
        disabled={loading}
      >
        {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}{" "}
      </Button>

      <div className="or">
        <span></span>
        <small>Or log in with</small>
        <span></span>
      </div>

      <div className="link">
        <a href="#" className="btn btn-secondary">
          <CustomImage
            src="/googleee.svg"
            alt="googleee"
            style={{ height: "auto" }}
          />
          <span>Facebook</span>
        </a>
        <a href="#" className="btn btn-secondary">
          <CustomImage
            src="/faceeee.svg"
            alt="faceeee"
            style={{ height: "auto" }}
          />
          <span>Google</span>
        </a>
      </div>

      <div className="line"></div>

      <div className="regis">
        <span className="text-secondary">ยังไม่เคยใช้บริการ ?</span>
        <Link href="#" className="text-primary">
          สมัครที่นี่
        </Link>
      </div>
    </form>
  );
}

export default Login;
