<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
  import { 
    getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc 
  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAyEhyeZKSmMoJSgRWb-rtO1ARZ2o46-i8",
    authDomain: "project-cst.firebaseapp.com",
    projectId: "project-cst",
    storageBucket: "project-cst.firebasestorage.app",
    messagingSenderId: "16968914162",
    appId: "1:16968914162:web:d90b32e3aed455f6c66c6b",
    measurementId: "G-Q5PPVNXS84"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  // 🔥 make it available globally
  window.db = db;
  window.firebaseFns = { collection, addDoc, getDocs, deleteDoc, doc, updateDoc };
   window.firebaseReady = true;


<!-- 2. Your JS -->
<script src="script.js"></script>
</script>