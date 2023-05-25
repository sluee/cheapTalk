<template>
    <nav class="navbar navbar-expand-lg  p-3">
		<div class="container">
			<!-- <img src="@/assets/logo.png" alt=""> -->
		  <a class="navbar-brand" href="#">CheapTalk</a>
		  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
			<ul class="navbar-nav" v-show="!isSignedIn">
			  <li class="nav-item">
				<router-link to="/login" class="nav-link text-dark">Log in</router-link>
			  </li>
			  <li class="nav-item">
				<router-link to="/register" class="nav-link text-dark">Register</router-link>
			  </li>
			</ul>  
			<div class="collapse navbar-collapse justify-content-end" id="navbarNavDarkDropdown" v-for="midterm in cheapTalk" :key="midterm.id" >
			  <ul class="navbar-nav " v-show="isSignedIn">
				<li class="nav-item">
				  <router-link to="/home" class="nav-link text-dark">Home</router-link>
				</li>
				<li class="nav-item">
				  <router-link to="/dashboard" class="nav-link text-dark">Dashboard</router-link>
				</li>
				<li class="nav-item">
				  <router-link to="/post" class="nav-link text-dark">Posts</router-link>
				</li>
				<li class="nav-item dropdown m-1">
				  <a class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style="text-decoration:none; color:black">
					{{ midterm.fullName }}
				  </a>
				  <ul class="dropdown-menu dropdown-menu-dark">
					<li><router-link to="#" class="dropdown-item" >Settings</router-link></li>
					<li><router-link to="/register" class="dropdown-item" @click="logout">Log out</router-link></li>
				  </ul>
				</li>
			  </ul>
			</div>
		  </div>
		  </div>
		</nav>
  <RouterView/>
  </template>
  
  <!-- <script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import { onMounted, ref } from 'vue'
  import { onAuthStateChanged, signOut } from 'firebase/auth';
  import { auth } from '../firebase/index.js';
import { collection,onSnapshot,orderBy,query } from 'firebase/firestore';
  import { db } from '../firebase/index.js';
  const isSignedIn = ref(false)
  
  onMounted(()=>{
	onAuthStateChanged(auth, function(user){
	  if(user){
		if(user.emailVerified){
		  isSignedIn.value = true
	  
  
	  }
	  }}
  )}
  )
  const cheapTalk = ref([]) 
  onMounted(()=>{
	onAuthStateChanged(auth,(user)=>{
		  if(user){
			const mid = query(collection(db,'cheapTalk'), orderBy('fullName'));
			onSnapshot(mid,(snapshot)=>{
			  const midtermTmp = [];
			  snapshot.forEach((doc)=>{
				const midterm = {
				  id:doc.id,
				  fullName:doc.data().fullName,
				  username:doc.data().username,
				  gender:doc.data().gender,
				  email:doc.data().email,
				  completed:doc.data().completed
				}
				if(midterm.email === user.email){
				  midtermTmp.push(midterm);
				}
			  })
			  cheapTalk.value = midtermTmp
			})
		  }
		})
  })
  
  
  const logout = () =>{
	signOut(auth)
	  .then(() =>{
		console.log('signed out!')
		isSignedIn.value = false
	  })
  }
	  
</script> -->
<script setup>
import {db} from '../firebase/index.js'
import {addDoc, collection, onSnapshot,deleteDoc, doc, updateDoc, getDoc, query, orderBy} from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue';
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase/index.js';
import router from '../router';

const isSignedIn = ref (false)


 
onMounted(()=>{
	onAuthStateChanged(auth, function(user){
	  if(user){
		if(user.emailVerified){
		  isSignedIn.value = true
	  
  
	  }
	  }}
  )}
  )


const logout = () =>{
  signOut(auth)
  .then(()=>{
    isSignedIn.value = false
    
  })
  window.location.reload();
}



const cheapTalk = ref([])
    const id = ref(1)
    const q = (collection(db, "cheapTalk"));
    
    onMounted(async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const q = query(collection(db, "cheapTalk"), orderBy("fullName"));
      onSnapshot(q, (snapshot) => {
        const midtermTmp = [];
        snapshot.forEach((doc) => {
          const midterm = {
            id: doc.id,
            fullName: doc.data().fullName,
            username: doc.data().username,
            gender: doc.data().gender,
            email: doc.data().email,
            completed: doc.data().completed,
          };
          if (midterm.email === user.email) {
            midtermTmp.push(midterm);
          }
        });
        cheapTalk.value = midtermTmp;
      });
    }
  });
});

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&subset=devanagari,latin-ext');
@import url('https://fonts.googleapis.com/css2?family=Delicious+Handrawn&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC&family=Bruno+Ace&family=Bruno+Ace+SC&family=Caveat&display=swap');

body{
font-family: 'Poppins', sans-serif;
font-size: 16px;
line-height: 24px;
font-weight: 400;
color: #212112;
background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat-back.svg');
background-position: center;
background-repeat: no-repeat;
background-size: cover;
background-color: plum;
overflow-x: hidden;

}

.navbar{
padding: 0;
}

.navbar-brand{
	font-family: 'Amatic SC', cursive;
	font-size: x-large;
	color:purple;
	font-size: 2rem;
    font-weight: 600;
}

.nav-link{
	color: #143d59;
	font-weight: 500;
	transition: all 200ms linear;
}
.nav-item:hover .nav-link{
	color: plum;
}
.nav-item.active .nav-link{
	color: #777;
}
.nav-link {
	position: relative;
	padding: 5px;
	display: inline-block;
}
.nav-item:after{
	position: absolute;
	bottom: -5px;
	left: 0;
	content: '';
	background-color: purple;
	opacity: 0;
}
.nav-item:hover:after{
	bottom: 0;
	opacity: 1;
}
.nav-item{
	position: relative;
  	transition: all 200ms linear;
}
 a span{
	color:plum;
	font-size: 30px;
	font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
 }

 img{
	width: 5rem;
 }
</style>