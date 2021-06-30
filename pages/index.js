export default function index() {
    
}
export async function getServerSideProps(){
    return {
        redirect: {
            destination: "/login",
        },
    };
}