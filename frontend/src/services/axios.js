// // import axios from "axios";
// // const instance = axios.create({
// //   baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// //   withCredentials: false,
// // });
// // instance.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");

// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }

// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // instance.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     // ✅ Auto logout if token expired / invalid
// //     if (error.response?.status === 401) {
// //       console.warn("Unauthorized — token invalid or expired");

// //       localStorage.removeItem("token");

// //       // Optional: redirect to admin login
// //       if (window.location.pathname !== "/admin/login") {
// //         window.location.href = "/admin/login";
// //       }
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// // export default instance;



// import axios from "axios";

// /*
// |--------------------------------------------------------------------------
// | AXIOS INSTANCE
// |--------------------------------------------------------------------------
// | All API requests automatically go to:
// | http://localhost:5000/api
// | (matches server.js -> app.use("/api/..."))
// */

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true, // ✅ allow cookies & auth if needed later
//   timeout: 15000, // ✅ prevent hanging requests
// });

// /*
// |--------------------------------------------------------------------------
// | REQUEST INTERCEPTOR
// |--------------------------------------------------------------------------
// | Automatically attach JWT token
// */
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /*
// |--------------------------------------------------------------------------
// | RESPONSE INTERCEPTOR
// |--------------------------------------------------------------------------
// | Handle auth errors globally
// */
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error?.response?.status;

//     // ✅ Token expired / invalid
//     if (status === 401) {
//       console.warn("Unauthorized — token expired or invalid");

//       localStorage.removeItem("token");

//       // Redirect only if not already on login page
//       if (!window.location.pathname.includes("/admin/login")) {
//         window.location.href = "/admin/login";
//       }
//     }

//     // ✅ Optional: log 404 API errors (helps debugging)
//     if (status === 404) {
//       console.warn("API route not found:", error.config?.url);
//     }

//     return Promise.reject(error);
//   }
// );

// export default instance;


// import axios from "axios";

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE
//     ? `${import.meta.env.VITE_API_BASE}/api`
//     : "http://localhost:5000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: false,
// });

// // ✅ Attach JWT automatically
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Auto logout if token invalid
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.warn("Token expired or invalid");

//       localStorage.removeItem("token");

//       if (window.location.pathname !== "/admin/login") {
//         window.location.href = "/admin/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default instance;


import axios from "axios";

/*
  ✅ API BASE LOGIC
  - If VITE_API_BASE exists → use it
  - Otherwise fallback to localhost
*/
const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000";

const instance = axios.create({
  baseURL: `${API_BASE}/api`, // ✅ ALWAYS includes /api
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

/* =====================================================
   ✅ REQUEST INTERCEPTOR (Attach JWT Automatically)
===================================================== */
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // DEBUG (remove later if you want)
    console.log("API CALL →", config.baseURL + config.url);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =====================================================
   ✅ RESPONSE INTERCEPTOR (Auto Logout on 401)
===================================================== */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — token expired or invalid");

      localStorage.removeItem("token");

      // redirect only if not already on login
      if (!window.location.pathname.includes("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;