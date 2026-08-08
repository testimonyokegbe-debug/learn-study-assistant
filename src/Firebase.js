import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";

   const firebaseConfig = { /* paste your config here */ };
   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);