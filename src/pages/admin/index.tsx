import { NextPage } from "next";
import styles from "@/styles/modules/admin/login.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useEffect } from "react";

interface Props {}

const Page = ({}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/dashboard");
    }
  }, [status]);
  const login = async () => {
    await signIn("google", { redirect: false });
  };
  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.text}>Login</h1>
        <button
          onClick={login}
          className={`pi pi-google ${styles.googleButton}`}
        ></button>
      </div>
    </section>
  );
};

export default Page;
