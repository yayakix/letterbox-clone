import { ConfigEnv, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    define: {
      "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
    },
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
  });
};
