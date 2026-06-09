import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/profile");
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return <p>Logging you in...</p>;
}

export default OAuthSuccess;