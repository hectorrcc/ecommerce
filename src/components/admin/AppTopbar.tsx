import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

interface Props {
  url: string;
  label: string;
  icon: string;
}
const BootonMenu = ({ url, label, icon }: Props) => {
  return (
    <Link className=" px-2 mx-2 !text-slate-500 hover:text-red-600 " href={url}>
      <span className={`${icon} mr-1`}></span>
      {label}
    </Link>
  );
};

const AppTopbar = () => {
  const { data: session } = useSession();
  const buttons = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      url: "/admin/dashboard",
    },
    {
      label: "Products",
      icon: "pi pi-database",
      url: "/admin/products",
    },
  ];
  return (
    <div className="layout-topbar !bg-white">
      <Link href="/admin/dashboard" className="layout-topbar-logo">
        <Image
          priority
          className="w-36"
          src={"/img/logo.png"}
          width={100}
          height={150}
          alt="logo"
        />
      </Link>
      <div className="w-full flex justify-between items-center">
        <div>
          {buttons.map((item, index) => (
            <BootonMenu
              key={index}
              url={item.url}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </div>
        <div className=" flex space-x-2 items-center">
        <Avatar
          image={session?.user?.image ? session.user.image : ""}
          size="large"
          shape="circle"
        />
        <Button icon="pi pi-sign-in" rounded text aria-label="Filter" onClick={async()=> await signOut()} />
        </div>
      </div>
    </div>
  );
};

export default AppTopbar;
