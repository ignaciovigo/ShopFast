import SideBar from "./SideBar";
import SubNav from "./SubNav";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <>
      <main className='w-full h-screen flex flex-col md:flex-row bg-[--bg-100] md:overflow-hidden'>
        <div className="w-full flex-none md:w-64">
          <SideBar />
        </div>
        <section className='flex flex-col w-full h-full overflow-y-auto'>
          <article className="h-full w-full">
            <Outlet />
          </article>
        </section>
      </main>
    </>
  );
}
