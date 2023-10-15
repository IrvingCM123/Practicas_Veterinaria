import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBE1y6DQ1xeKDTuuFvl7wkNLcLUsMn49ZU",
  authDomain: "veterinaria-75bd6.firebaseapp.com",
  projectId: "veterinaria-75bd6",
  storageBucket: "veterinaria-75bd6.appspot.com",
  messagingSenderId: "445641217415",
  appId: "1:445641217415:web:67290301793e01dcae6f22",
  measurementId: "G-KRCBXGH2CT"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
