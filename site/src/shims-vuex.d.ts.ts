import { RootState } from "@/store"; // path to store file

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: { state: RootState };
  }
}
