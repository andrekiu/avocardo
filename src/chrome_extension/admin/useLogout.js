import { useRouter } from "next/router";
import React from "react";

export default function useLogout() {
  const router = useRouter();
  const [inTransition, setInTransition] = React.useState(false);

  const onSubmit = () => {
    setInTransition(() => false);
    fetch("/api/logout", {
      method: "POST",
    }).then(() => {
      router.push("/admin/login");
    });
  };
  return [inTransition, onSubmit];
}
