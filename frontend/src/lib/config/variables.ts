const isProd = process.env.NODE_ENV === "production";

const FRONTEND_URL = process.env.FRONTEND_URL!;
const BACKEND_URL = process.env.BACKEND_URL!;

export {
  isProd,
  FRONTEND_URL,
  BACKEND_URL
};
