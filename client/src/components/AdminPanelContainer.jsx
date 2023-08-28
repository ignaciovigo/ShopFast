import UsersTable from "./UsersTable";

export default function AdminPanelContainer() {
  
  return (
    <section className='mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col'>
       <div className="bg-white rounded-lg p-4">
       <h2 className="text-2xl font-bold ff-third mb-1">User management</h2>
        <UsersTable />
       </div>
    </section>
  );
}
