<template>
    <div class="container">
      <div class="row">
        <h1>Dashboard</h1>
        <h6>Quick Statistics</h6>
        <hr>
        <div class="col-md-6" >
          <div class="cards  ">
            <div class="card mt-3 text-white" style="background-color:skyblue">
                <div class="card-body">
                    <!-- <h1 style="font-weight:600">{{ samples.length }}</h1> -->
                    <div class="text-center">
                        <h5>NO OF USERS</h5>
                    </div>
                   
                    <hr>
                    <h2 class="text-center">{{ cheapTalk.length }}</h2>
                </div>
            </div>
            
        </div>
        </div>
        <div class="col-md-6">
          <div class="cards  ">
            <div class="card mt-3 text-white" style="background-color:PLUM">
                <div class="card-body">
                    <!-- <h1 style="font-weight:600">{{ samples.length }}</h1> -->
                    <div class="text-center">
                        <h5>NO OF POSTS</h5>
                    </div>
                   
                    <hr>
                    <h2 class="text-center">{{ posts.length }}</h2>
                </div>
            </div>
            
        </div>
        </div>
        
      </div>
      <br>
      <div class="row">
       
        
        <h1>List of CheapTalk Users</h1>
        <hr>
        <div class="col-md-4" v-for="user in cheapTalk" :key="user.cheapTalk"  >
            <div class="card mt-3 " :style="{ backgroundColor: user.gender === 'male' ? '#19A7CE'  : 'pink' }" >
                <div class="card-body">
                    <div class="d-flex">
                      <div class="flex-grow-1">
                        <h4 >{{ user.fullName }}</h4>
                      </div>
                      <h6>{{ user.username }}</h6>
                    </div>
                   
                    <hr>
                    <h6>{{user.email}}</h6>
                    <p>Gender: {{ user.gender }}</p>
                    <p class="mt-2  text-center">
                      <span v-if="user.postCount > 1">{{ user.postCount}} posts</span>
                      <span v-else>{{ user.postCount}} post</span>
                    </p>
                    <RouterLink :to="`/${user.uid}/UsersPost`" class="text-sm hover:text-blue-400"><i class="fa-solid fa-eye"></i>&nbsp;View</RouterLink>
                </div>
            </div>    
        </div>
      </div>
    </div>
  </template>

<script setup>
    import { ref, onMounted } from 'vue'
    import {db} from '../firebase/index.js'
    import { collection, onSnapshot} from "firebase/firestore";
    import { RouterLink } from 'vue-router';
    import { query, orderBy,where,getDocs } from 'firebase/firestore';
    
  
const qCheapTalk =(collection(db, 'cheapTalk'));
const qPost =(collection(db, 'posts'));
const cheapTalk = ref([]);
const posts = ref([]);

// Get Users Data
const getUsersData = async () => {
  try {
    const querySnapshot = await getDocs(qCheapTalk);
    const usersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      uid: doc.data().uid,
      fullName: doc.data().fullName,
      username: doc.data().username,
      gender: doc.data().gender,
      email: doc.data().email,
    }));

    cheapTalk.value = usersData;
  } catch (error) {
    console.log('Error getting users data: ', error);
  }
};

// Get All Posts Data
const getAllPostsData = async () => {
  try {
    const querySnapshot = await getDocs(qPost);
    const postsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      genre: doc.data().genre,
      content: doc.data().content,
      userId: doc.data().userId,
      fullName: doc.data().fullName,
      gender: doc.data().gender,
      username:doc.data().username,
      completed: doc.data().completed,
    }));

    posts.value = postsData;
  } catch (error) {
    console.log('Error getting posts data: ', error);
  }
};

onSnapshot(
  query(qCheapTalk, orderBy('fullName', 'asc')),
  async (querySnapshot) => {
    const userTmp = [];
    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const id = doc.data().uid;
        const querySnapshot = await getDocs(
          query(qPost, where('userId', '==', id))
        );
        const count = querySnapshot.size;
        const user = {
          id: doc.id,
          uid: doc.data().uid,
          fullName: doc.data().fullName,
          username: doc.data().username,
          gender: doc.data().gender,
          email: doc.data().email,
          postCount: count,
        };
        userTmp.push(user);
      })
    );
    //dire masud tanang data sa cheaptalk(users)
    cheapTalk.value = userTmp;
    // console.log('Users Data:', cheapTalk.value);

    //pagkuha sa tanang data sa posts(pero ang gigamit ra ani is para makuha ang length sa posts sa tanang users)
    getAllPostsData();
//   console.log('Posts Data:', posts.value);
    
  }
);

</script>

<style>
.card-client {
  background: #2cb5a0;
  width: 13rem;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 20px;
  padding-right: 20px;
  border: 4px solid #7cdacc;
  box-shadow: 0 6px 10px rgba(207, 212, 222, 1);
  border-radius: 10px;
  text-align: center;
  color: #fff;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
}

.card-client:hover {
  transform: translateY(-10px);
}

.user-picture {
  overflow: hidden;
  object-fit: cover;
  width: 5rem;
  height: 5rem;
  border: 4px solid #7cdacc;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.user-picture svg {
  width: 2.5rem;
  fill: currentColor;
}

.name-client {
  margin: 0;
  margin-top: 20px;
  font-weight: 600;
  font-size: 18px;
}

.name-client span {
  display: block;
  font-weight: 200;
  font-size: 16px;
}

.social-media:before {
  content: " ";
  display: block;
  width: 100%;
  height: 2px;
  margin: 20px 0;
  background: #7cdacc;
}

.social-media a {
  position: relative;
  margin-right: 15px;
  text-decoration: none;
  color: inherit;
}

.social-media a:last-child {
  margin-right: 0;
}

.social-media a svg {
  width: 1.1rem;
  fill: currentColor;
}

/*-- Tooltip Social Media --*/
.tooltip-social {
  background: #262626;
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  padding: 0.5rem 0.4rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -90%);
  transition: all 0.2s ease;
  z-index: 1;
}

.tooltip-social:after {
  content: " ";
  position: absolute;
  bottom: 1px;
  left: 50%;
  border: solid;
  border-width: 10px 10px 0 10px;
  border-color: transparent;
  transform: translate(-50%, 100%);
}

.social-media a .tooltip-social:after {
  border-top-color: #262626;
}

.social-media a:hover .tooltip-social {
  opacity: 1;
  transform: translate(-50%, -130%);
}
</style>