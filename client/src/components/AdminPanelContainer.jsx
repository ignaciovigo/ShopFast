import UsersTable from "./UsersTable";

export default function AdminPanelContainer() {
  
  return (
    <section className='mx-auto p-4  flex flex-col h-full items-start w-full justify-top'>
       <div className="rounded-lg w-full">
       <h2 className="text-2xl font-bold ff-third text-[--text-100] pb-2">User management</h2>
        <UsersTable />
       </div>
    </section>
  );
}
