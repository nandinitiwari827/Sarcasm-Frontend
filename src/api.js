import axios from "axios"

export let API_BASE_URL = "https://sarcasm-backend.onrender.com/api/v1"
export let AI_BASE_URL = "https://nandinitiwari-sarcasm-ai-backend.hf.space"

axios.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status

    if (status === 401 || status === 403) {
      console.warn("Token expired / invalid → auto logout")

      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")

      sessionStorage.clear()
      window.location.href = "/"
    }
    return Promise.reject(error)
})

export let registerUser=async(formData)=>{
    try{
        let response=await axios.post(`${API_BASE_URL}/users/register`, formData, {
            headers: {
                "Content-type": "application/json"
            }
        })
        return response.data
    }catch(error){
        console.log("Registration error: " ,error.response?.data || error.message)
        throw error
    }
}

export let loginUser=async(loginData)=>{
    try{
        let response=await axios.post(`${API_BASE_URL}/users/login`, loginData, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
        console.log('Login response:', response.data);
        return response.data
    }catch(error){
    console.log('Login error (full response): ', error.response);
    console.log('Login error message: ', error.response?.data?.message || error.message);
    throw error
    }
}

export let logoutUser=async()=>{
    try{
        let response=await axios.post(`${API_BASE_URL}/users/logout`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
     if (response.status === 200) {
            return response.data
        } else {
            throw new Error(`Logout failed with status: ${response.status}`);
        }
    }catch(error){
      console.error('Logout failed:', {
            message: error.response?.data?.message || error.message,
            status: error.response?.status,
        });
    throw error
    }
}

export let changeCurrentPassword = async (oldPassword, newPassword) => {
    try {
        let response = await axios.post(`${API_BASE_URL}/users/change-password`, {
            oldPassword,
            newPassword,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
    console.log('Failed to change password (full response): ', error.response);
    console.log('Password change error message: ', error.response?.data?.message || error.message);
    throw error
    }
}

export let forgotPassword = async (email, phoneNumber, newPassword) => {
    try {
        let response = await axios.post(`${API_BASE_URL}/users/forgot-password`, {
            email,
            phoneNumber,
            newPassword,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
    console.log('Failed to change password (full response): ', error.response);
    console.log('Password change error message: ', error.response?.data?.message || error.message);
    throw error
    }
}

export let googleAuthUser = async (token) => {
  try {
    let response = await axios.post(
      `${API_BASE_URL}/users/google`,
      { token }, 
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
    );

    return response.data;

  } catch (error) {
    console.log(
      "Google auth error:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export let detectSarcasmAPI = async (formData) => {
  try {
    let response = await axios.post( `${AI_BASE_URL}/predict`, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
    return response.data
  } catch (error) {
    console.log("Sarcasm API error:", error.response?.data || error.message);
    throw error
  }
}