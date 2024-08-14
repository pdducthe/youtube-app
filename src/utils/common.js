import LocalStorageUtils from "./localStorage.util";

export const handleCallGoogleToken = (scope) => {
  const tokenScope = scope ? scope : "https://www.googleapis.com/auth/youtube";
  /* global google */
  // @ts-ignore
  const client = google.accounts.oauth2.initTokenClient({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    scope: tokenScope,
    callback: (tokenResponse) => {
      if (tokenResponse && tokenResponse.access_token) {
        LocalStorageUtils.saveGoogleAccessToken(tokenResponse.access_token);
      }
    },
  });
  client.requestAccessToken();
};

export const handleApiResponse = (res) =>{
  const output = res.response.data.error;
  if(Array.isArray(output.errors) && output.errors?.length !==0){
    return {
      statusCode: output.code,
      data: null
    }
  }
};


