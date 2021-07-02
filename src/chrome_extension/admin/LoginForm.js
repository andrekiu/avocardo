import { useRouter } from "next/router";
import LoginFormCss from "./LoginForm.module.css";

export function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = React.useState("IDLE");

  const onSubmit = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: e.currentTarget.password.value,
      }),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (!payload || payload.auth_status !== "PASSED") {
          setStatus("AUTH_FAILED");
          return;
        }
        router.push("/admin/dashboard");
      });
  };

  return (
    <div className={LoginFormCss["root"]}>
      <form className={LoginFormCss["form"]} onSubmit={onSubmit}>
        <span>
          <label>Password: </label> <input name="password" type="password" />
        </span>
        <button className={LoginFormCss["form-submit"]} type="submit">
          Submit
        </button>
        {status === "AUTH_FAILED" ? (
          <div className={LoginFormCss["error"]}> Incorrect, Try Again </div>
        ) : null}
      </form>
    </div>
  );
}
