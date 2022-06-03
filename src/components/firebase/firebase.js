import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAUbPIviJSWZ5prMPy004WsZFx17lM_Ay8",
	authDomain: "proshop-2cdb6.firebaseapp.com",
	projectId: "proshop-2cdb6",
	storageBucket: "proshop-2cdb6.appspot.com",
	messagingSenderId: "852446655209",
	appId: "1:852446655209:web:098530be8a7fce56a53678",
	measurementId: "G-J5J48HPY9Q",
};



const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };
