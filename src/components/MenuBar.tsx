import Link from "next/link";
import Image from "next/image";
import ShoppingCar from "./ShoppingCar";

const AppTopbar = () => {
  return (
    <div className="layout-topbar flex justify-between">
      <Link href="/" className="layout-topbar-logo">
        <Image src={"/img/logo.png"} width={100} height={150} alt="logo" />
      </Link>

      <ShoppingCar />
    </div>
  );
};

export default AppTopbar;
