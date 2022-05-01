import { defineConfig } from "vite";
import path from "path";

console.log(path.resolve());

export default defineConfig({
  publicDir: "./assets",
});
