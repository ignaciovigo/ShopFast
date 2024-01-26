import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function ProtectedRoute({ children }) {
    const {isAuthenticated, isLoading, currentUser } = useAuth()
    if(isLoading){
      return <h1 className="flex text-center justify-center text-2xl">Loading</h1>
    }
    if(!isAuthenticated) return <Navigate to='/login' replace/>
  return children
}
