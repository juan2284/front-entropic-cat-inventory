import Loader from "@/components/globals/Loader";
import ChangePassword from "@/components/profile/ChangePassword";
import ProfileForm from "@/components/profile/ProfileForm";
import { useAuth } from "@/hooks/authHooks/useAuth";

export default function ProfileView() {
  const { data, isLoading } = useAuth();
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      <ProfileForm data={data} />
      <ChangePassword />    
    </>
  );
}