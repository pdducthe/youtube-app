export default class LocalStorageUtils {
  static getAuthToken = () => {
    const isAuth = JSON.parse(
      localStorage.getItem("isAuthenticated") || "false"
    );
    return isAuth;
  };

  static getGoogleAccessToken = () => {
    return localStorage.getItem("googleAccessToken") || "";
  };

  static getActivityList = () => {
    const rawData = localStorage.getItem("activityList") || "[]";
    return JSON.parse(rawData);
  };

  static saveActivityList = (data) => {
    localStorage.setItem("activityList", JSON.stringify(data));
  };

  static saveGoogleAccessToken = (token) => {
    localStorage.setItem("googleAccessToken", token);
  };

  static clearUserInfo = () => {
    localStorage.removeItem("googleAccessToken");
    localStorage.removeItem("isAuthenticated");
    localStorage.setItem("activityList", "[]")
  };
}
