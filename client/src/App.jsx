import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import AuthRoute from "./components/AuthRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from './components/Main'
import Login from './components/Login'
import Register from "./components/Register";
import { ToastBar, Toaster } from "react-hot-toast";
import Loading from "./components/Loading";
import ProfileContainer from "./components/ProfileContainer";
import HistoryContainer from "./components/HistoryContainer";
import ProductsContainer from "./components/ProductsContainer";
import { CartProvider } from "./contexts/CartProvider";
import Purchase from "./components/Purchase";
import AdminPanelContainer from "./components/AdminPanelContainer";
import { useAuth } from "./hooks/useAuth";
import NotFound from "./components/NotFound";

function App() {
  const { currentUser } = useAuth()
  return (
    <>
      <Toaster  
      toastOptions={{
        className: 'ff-second semibold' ,
        success: {
          className:'bg-green-200',
          },
          error: {
            className:'bg-red-200',
            }
      }} 
  />
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
                <CartProvider>
                    <Main />
                </CartProvider>
            </ProtectedRoute>
          }
        >
          <Route index path="products" element={<ProductsContainer />} />
          <Route path='profile' element={<ProfileContainer />} />
          {['USER', 'PREMIUM'].includes(currentUser?.role) && (<Route path='history' element={<HistoryContainer />} />)}
          {['USER', 'PREMIUM'].includes(currentUser?.role) && ( <Route path='cart' element={<Purchase />} />)}
          {currentUser?.role === 'ADMIN' && (<Route path='usermanagement' element={<AdminPanelContainer />} />)}
        </Route>
        <Route
          path='/login'
          index
          element={
            <AuthRoute>
                <Login />
            </AuthRoute>
          }
        />
        <Route
          path='/register'
          element={
            <AuthRoute>
                <Register />
            </AuthRoute>
          }
        />
      <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
