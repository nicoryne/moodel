import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />

      <main className="mt-16 h-full">
        <Outlet />
      </main>
    </>
  );
}
