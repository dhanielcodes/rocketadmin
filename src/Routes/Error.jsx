import AppButton from "../reuseables/AppButton";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        height: "100vh",
        border: "60px solid #00A85A",
      }}
    >
      <div>
        <h2>Page Not Found</h2>
        <img
          style={{
            width: "500px",
            margin: "10px 0",
          }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ISR-HW-404.svg/2560px-ISR-HW-404.svg.png"
          alt=""
        />
        <div>
          <Link to="/dashboard">
            <AppButton placeholder="Go to Dashboard" />
          </Link>
        </div>
      </div>
    </div>
  );
}
