import { Outlet } from "react-router-dom"

export default function Root() {
  return (
    <div>
      <h1>Root</h1>
      <Outlet></Outlet>
    </div>
    
  )
}
