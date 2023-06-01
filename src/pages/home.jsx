import { NavbarComponent } from '../components/navbar'
import { ProtectedComponent } from '../components/protectedComponent'
// import useUserDetail from '../components/useUserDetail'

export const Home = () => {
  return (
    <div>
      <NavbarComponent />
      <ProtectedComponent allowedRole="student">
        <h1 className="text-center">Home</h1>
      </ProtectedComponent>
    </div>
  )
}
