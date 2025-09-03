import { Route, Routes } from "react-router"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { Toaster } from "sonner"
import ForgotPassword from "./pages/ForgotPassword"
import CompleteProfile from "./pages/CompleteProfile"
import useGetCurrentUser from "./hooks/useGetCurrentUser"
import { useSelector } from "react-redux"


function App() {

  useGetCurrentUser()
  const { userData } = useSelector(state => state.user)
  console.log(userData)
  return (
    <>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />

      </Routes>
    </>
  )
}

export default App
