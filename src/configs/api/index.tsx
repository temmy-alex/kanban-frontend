import Axios from "axios";
import ErrorHandler from "./error";

const httpClient = Axios.create();

let apiUrl = process.env.REACT_APP_BASE_URL;

const HttpPost = async (url, data) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    let res = await httpClient.post(apiUrl + url, data, {
      headers: {
        access_token: accessToken ? accessToken : null,
      },
    });

    return res.data.data;
  } catch (error) {
    ErrorHandler(error);
    throw error;
  }
};

const HttpPut = async (url, data) => {
    const accessToken = localStorage.getItem("accessToken");
  
    try {
      let res = await httpClient.put(apiUrl + url, data, {
        headers: {
          access_token: accessToken ? accessToken : null,
        },
      });
  
      return res.data.data;
    } catch (error) {
      ErrorHandler(error);
      throw error;
    }
  };

const HttpGet = async (url) => {
    const accessToken = localStorage.getItem("accessToken");
  
    try {
      let res = await httpClient.get(apiUrl + url, {
        headers: {
          access_token: accessToken ? accessToken : null,
        },
      });
  
      return res.data.data;
    } catch (error) {
      ErrorHandler(error);
      throw error;
    }
  };

export {
    HttpPost,
    HttpGet,
    HttpPut
}
