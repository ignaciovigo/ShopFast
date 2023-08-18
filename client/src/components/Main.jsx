import SideBar from "./SideBar";
import SubNav from "./SubNav";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <>
      <main className='w-full h-full flex bg-slate-700'>
        <SideBar />
        <section className='flex flex-col w-full h-full overflow-y-auto'>
          <SubNav />
          <article className="h-full w-full">
            <Outlet />
          </article>
        </section>
      </main>
    </>
  );
}
