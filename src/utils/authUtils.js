import axios from "axios";

export async function refreshAccessToken(token) {
  console.log("authUtils > refreshAccessToken Start...");
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  await axios
    .post("/api/v1/jwt/refresh")
    .then((res) => {
      console.log("authUtils > Refresh Success!, ", res.data);
      const new_access = res.data.access;
      //   const sessionObj = sessionStorage.getItem("userInfo");
      //   let userInfo = sessionObj ? JSON.parse(sessionObj) : null;
      //   const refresh = userInfo ? userInfo.refresh : null;
      let userInfo = {
        access: new_access,
        refresh: token,
      };
      console.log("Refresh.New Token: ", userInfo);

      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      return new_access;
    })
    .catch((err) => {
      console.log(err);
    });
}
