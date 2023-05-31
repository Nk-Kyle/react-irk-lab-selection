import NavbarComponent from "../components/navbar";
import useUserDetail from "../components/useUserDetail";

export const Home = () => {
  const { userDetail, loading} = useUserDetail();

  return (
    <NavbarComponent/>
    
  );
};
