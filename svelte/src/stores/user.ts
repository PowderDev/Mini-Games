import type { User } from "src/types/http";
import { writable } from "svelte/store";

export const UserStore = writable<User>({} as User);
