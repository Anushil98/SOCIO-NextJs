export default function checkAuth(){
    const auth = localStorage.getItem("Authentication");
    if(auth !== null){
        return true;
    }return false;
}