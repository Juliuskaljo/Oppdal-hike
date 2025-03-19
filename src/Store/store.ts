import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';  // Importera User som typ

export const user = writable<User | null>(null);  // Typ för användaren, den kan vara User eller null
export const loading = writable<boolean>(true);