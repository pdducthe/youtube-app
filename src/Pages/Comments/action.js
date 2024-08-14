import axios from "axios";
import { handleCallGoogleToken, handleApiResponse } from "../../utils/common";
import LocalStorageUtils from "../../utils/localStorage.util";

const baseURL = process.env.REACT_APP_YOUTUBE_BASE_URL;

export const getTokenForComment = () => {
  handleCallGoogleToken("https://www.googleapis.com/auth/youtube.force-ssl");
};

export const getCommentListInOneVideo = async (videoId) => {
  const url = `${baseURL}/commentThreads`;
  const token = LocalStorageUtils.getGoogleAccessToken();
  const response = axios({
    method: "get",
    url,
    headers: { Authorization: `Bearer ${token}` },
    params: {
      part: "snippet",
      videoId,
      maxResults: 10,
    },
  })
    .then((res) => {
      return {
        data: res.data,
        statusCode: 200,
      };
    })
    .catch((err) => {
      return handleApiResponse(err);
      // return err.response;
    });
  return response;
};

export const getChannelIdByMe = async () => {
  const url = `${baseURL}/channels`;
  const token = LocalStorageUtils.getGoogleAccessToken();
  const response = axios({
    method: "get",
    url,
    headers: { Authorization: `Bearer ${token}` },
    params: {
      part: "id, snippet",
      mine: true,
    },
  })
    .then((res) => {
      console.log("getChannelIdByMe data", res.data);
      return {
        data: res.data,
        statusCode: 200,
      };
    })
    .catch((err) => {
      console.log("Error getChannelIdByMe", err);
      handleApiResponse(err);
    });
  return response;
};

export const addTopCommentInOneVideo = async (payload) => {
  const { textOriginal, channelId, videoId } = payload;
  const url = `${baseURL}/commentThreads`;
  const token = LocalStorageUtils.getGoogleAccessToken();

  const response = axios({
    method: "post",
    url,
    headers: { Authorization: `Bearer ${token}` },
    params: {
      part: "id, snippet",
    },
    data: {
      snippet: {
        channelId,
        videoId,
        topLevelComment: {
          snippet: {
            textOriginal,
          },
        },
      },
    },
  })
    .then((res) => {
      console.log("addTopCommentInOneVideo data", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("Error addTopCommentInOneVideo", err);
      return err.response;
    });
  return response;
};

export const editTopCommentInOneVideo = async (payload) => {
  console.log("payload", payload);
  const { textOriginal, id } = payload;
  const url = `${baseURL}/comments`;
  const token = LocalStorageUtils.getGoogleAccessToken();

  const response = axios({
    method: "put",
    url,
    headers: { Authorization: `Bearer ${token}` },
    params: {
      part: "id, snippet",
    },
    data: {
      id,
      snippet: {
        textOriginal,
      },
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleApiResponse(err);
      // console.log("Error editTopCommentInOneVideo", err);
      // return err.response;
    });
  return response;
};

export const replyCommentInOneVideo = async (payload) => {
  const { textOriginal, parentId } = payload;
  const url = `${baseURL}/comments`;
  const token = LocalStorageUtils.getGoogleAccessToken();

  const response = axios({
    method: "post",
    url,
    headers: { Authorization: `Bearer ${token}` },
    params: {
      part: "id, snippet",
    },
    data: {
      snippet: {
        parentId,
        textOriginal,
      },
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleApiResponse(err);
    });
  return response;
};

export const removeCommentInOneVideo = async (payload) => {
  const { id } = payload;
  const url = `${baseURL}/comments`;
  const token = LocalStorageUtils.getGoogleAccessToken();

  const response = axios({
    method: "delete",
    url,
    headers: { Authorization: `Bearer ${token}` },
    params: {
      id
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleApiResponse(err);
      // console.log("Error editTopCommentInOneVideo", err);
      // return err.response;
    });
  return response;
};