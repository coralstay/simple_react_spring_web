import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 로컬 개발 중 Spring Boot 백엔드(기본 포트 8080)로 API 요청을 프록시한다.
      // 배포 시에는 frontend/dist가 백엔드 정적 리소스로 서빙되므로 불필요.
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: "jsdom",
    // 로컬 setup 파일을 따로 두지 않고, @testing-library/jest-dom이 제공하는
    // vitest 전용 진입점을 바로 참조해 expect에 jest-dom matcher를 확장한다.
    setupFiles: ["@testing-library/jest-dom/vitest"],
  },
});
