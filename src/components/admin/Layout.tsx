import { ReactNode } from "react";
import AppTopbar from "./AppTopbar";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  children: ReactNode;
  session?: Session;
}

export default function Layout({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      <AppTopbar />
      <div className="layout-main-container">{children}</div>
    </SessionProvider>
  );
}
