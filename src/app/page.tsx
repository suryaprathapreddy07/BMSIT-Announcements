import Image from "next/image";
import Notifications from "./Components/Notifications/Notifications";

export default function Home() {
 
  return (
    <div >
      <div className="p-4"><Image className="h-[60px] w-[60px]" src="/favicon.ico" alt="BMSIT Logo" width={200} height={200} /></div>
      
    <Notifications/>
    </div>
   
  );
}
