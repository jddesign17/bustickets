import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import Loading from "../../../components/loading"


const schedule = () => {
  return (
    <div className=" bg-primary px-2">
      <Suspense fallback={<Loading/>}>
      <Outlet/>
      </Suspense>
    </div>
  )
}

export default schedule