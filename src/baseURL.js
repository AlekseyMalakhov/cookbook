let baseURL;

if (process.env.NODE_ENV === "development") {
    baseURL = "http://localhost:3000";
}
if (process.env.NODE_ENV === "production") {
    baseURL = "https://cookbook873.herokuapp.com";
}

export default baseURL;
