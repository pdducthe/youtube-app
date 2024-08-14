import axios from "axios";
import LocalStorageUtils from "../../utils/localStorage.util";

const baseURL = process.env.REACT_APP_YOUTUBE_BASE_URL;

export const getAccessToken = () => {
  return LocalStorageUtils.getGoogleAccessToken();
};

export const getActivityReport = async () => {
  const url = `${baseURL}/activities`;
  const token = getAccessToken();
  const response = axios({
    method: "get",
    url,
    headers: { Authorization: `Bearer ${token}` },
    params: {
      part: "snippet, contentDetails, id",
      mine:true,
      // channelId,
      maxResults: 10
    },
  })
    .then((res) => {
      console.log("getActivityReport data", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("Error getActivityReport", err);
      return err.response;
    });

  return response;
};
