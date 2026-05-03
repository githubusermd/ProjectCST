<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAyEhyeZKSmMoJSgRWb-rtO1ARZ2o46-i8",
    authDomain: "project-cst.firebaseapp.com",
    projectId: "project-cst",
    storageBucket: "project-cst.appspot.com",
    messagingSenderId: "16968914162",
    appId: "1:16968914162:web:d90b32e3aed455f6c66c6b"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  window.db = db;
  window.firebaseFns = { collection, addDoc, getDocs, deleteDoc, doc, updateDoc };

  // IMPORTANT
  window.firebaseReady = true;
</script>