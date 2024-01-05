import { useAuth } from "@/hooks/useAuth";

export default function AuthChecker({ children }) {
  useAuth();

  return <>{children}</>;
}
