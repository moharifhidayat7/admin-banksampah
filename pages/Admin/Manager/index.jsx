import ManagerLayout from '../../../components/Layouts/ManagerLayout'
import { getSession } from "next-auth/client";
export default function index(){
  return (
    <ManagerLayout/>
  )
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
      return {
          redirect: {
              destination: "/login",
          },
      };
  }
  return {
    props: {
        session
    },
};
}