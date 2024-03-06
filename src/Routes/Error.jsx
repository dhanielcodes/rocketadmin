import AppButton from "../reuseables/AppButton";
import { Link } from "react-router-dom";

export default function Error() {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const navAccess = userDetails?.userRoleMenuAccess
    ?.map((item) => {
      if (item?.menuAccessType?.id !== 1) {
        return {
          ...item,
        };
      }
    })
    .filter((item) => item !== undefined);
  console.log(navAccess?.filter((item) => item !== undefined));
  const menu1 = navAccess?.[0]?.menuName?.toLowerCase()?.replace(/\s+/g, "-");
  const menu2 = navAccess?.[0]?.userRoleSubMenuAccess[0]?.subMenuName
    .toLowerCase()
    ?.replace(/\s+/g, "-");
  const menu3 =
    navAccess?.[0]?.userRoleSubMenuAccess[0]?.userRoleSuSubbMenuAccess[0]?.subMenuName
      ?.toLowerCase()
      ?.replace(/\s+/g, "-");
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
          <Link
            to={
              menu3
                ? `/${menu3}`
                : menu2
                ? `/${menu2}`
                : menu1
                ? `/${menu1}`
                : "/"
            }
          >
            <AppButton placeholder="Go to Home Page" />
          </Link>
        </div>
      </div>
    </div>
  );
}
