import { useAuth } from '../hooks/useAuth'

export default function ProfileContainer() {
    const {currentUser} = useAuth()
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-[--bg-200] border border-[--border] shadow-lg rounded-lg overflow-hidden">

            <div className="px-4 py-5 sm:px-6 flex">
                <div>
                    <h3 className="text-2xl font-bold ff-fourth text-[--text-100]">Profile</h3>
                </div>
                <p className="m-auto max-w-2xl text-xl text-[--primary-100] font-bold ff-third">
                    Welcome back!
                </p>
            </div>
            <div className="border-t border-[--border] ff-fourth">
                <dl>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-[--text-400]">Full name</dt>
                        <dd className="mt-1 text-sm text-[--text-100] sm:mt-0 sm:col-span-2">{currentUser.fullName}</dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-[--text-400]">Email</dt>
                        <dd className="mt-1 text-sm text-[--text-100] sm:mt-0 sm:col-span-2">{currentUser.email}</dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-[--text-400]">Role</dt>
                        <dd className="mt-1 text-sm text-[--text-100] sm:mt-0 sm:col-span-2">{currentUser.role}</dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-[--text-400]">Age</dt>
                        <dd className="mt-1 text-sm text-[--text-100] sm:mt-0 sm:col-span-2">{currentUser.age}</dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
  )
}
