import { IsLoadingAtom } from "@/atom/global.atom";
import { useRecoilValue } from "recoil";
import Loader from "../Loader";
import Subscription from "../Subscription";

export default function Layout({ children }) {
  const isLoading = useRecoilValue(IsLoadingAtom);

  return (
    <>
      {isLoading && <Loader isFullPage={true} />}

      <Subscription />

      {children}
    </>
  );
}
