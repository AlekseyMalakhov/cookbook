let baseURL;

if (process.env.NODE_ENV === "development") {
    baseURL = "http://localhost:3000";
}
if (process.env.NODE_ENV === "production") {
    baseURL = "blablabla";
}

export default baseURL;
