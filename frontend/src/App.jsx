import { Navigate, Route, Routes } from "react-router"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { Toaster } from "sonner"
import ForgotPassword from "./pages/ForgotPassword"
import CompleteProfile from "./pages/CompleteProfile"
import useGetCurrentUser from "./hooks/useGetCurrentUser"
import { useSelector } from "react-redux"
import Home from "./pages/Home"
import useGetCity from "./hooks/useGetCity"
import useGetMyShop from "./hooks/useGetMyShop"
import CreateEditShop from "./pages/CreateEditShop"


function App() {

  useGetCurrentUser()
  useGetCity()
  useGetMyShop()
  const { userData } = useSelector(state => state.user)

  return (
    <>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
        <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
        <Route path="/forgot-password" element={userData && !userData.isProfileComplete ? <ForgotPassword /> : <Navigate to={"/"} />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/" element={userData ? <Home /> : <Navigate to={"/signin"} />} />
        <Route
          path="/create-edit-shop"
          element={userData ? <CreateEditShop /> : <Navigate to={"/signin"} />}
        />
      </Routes>
    </>
  )
}

export default App
