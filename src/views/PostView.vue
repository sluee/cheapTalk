<template>
    <div class="container" >
        <h4>Create Posts</h4>
        <div class="cards px-4 mx-auto" style="width:80%" >
            <div class="card mt-2 text-white" style="background-color:plum">
                <div class="card-body" >
                    
                    <div class="d-flex" >
                      <div class="flex-grow-1" >
                        <h5 class="text-dark">Write a post</h5>
                      </div>
                      
                      <div class="form-outline-8 ">
                
                        <select class="form-select" v-model="genre" >
                          <option hidden selected>Select Category</option>
                          <option disabled>Select Category</option>
                          <option value="Religion">Religion</option>
                          <option value="Education">Education</option>
                          <option value="Politics">Politics</option>
                          <option value="Romance">Romance</option>
                          <option value="Comedy">Comedy</option>
                        </select>
                      </div>
                    </div>
                   
                    <hr>
                    <h6>Content</h6>
                    <div class="form-outline 8 mb-2">
                        <textarea type="text" id="address" class="form-control"  placeholder="Share your ideas.." v-model="content"/>
                    </div>
                    <button type="button" class="btn btn-success float-end px-5" @click="addPost" >Post</button>
                </div>
            </div>
        </div>
        <div>
          <h5 class="mt-5 text-center">My Recent Posts</h5>
            <!-- <div>
                <select class="form-select " v-model="selectedOption" @change="sortedPosts" style="width:20%">
                  <option value="all">All</option>
                  <option v-for="genre in posts" :key="genre.posts">{{ genre.genre }}</option>
                  
                </select>
            </div> -->
        </div>
        
        <hr>
        <div class="row">
          <div class="col-md-4" v-for="post in posts" :key="post.id">
            <div class="cards">
              <div class="card mt-2 text-dark" :style="{ backgroundColor: post.gender === 'female' ? 'pink' : '#19A7CE' }">
                <div class="card-body">
                  <div class="d-flex">
                    <div class="flex-grow-1">
                      <h6>{{ post.fullName }}</h6>
                    </div>
                    <h6>{{ post.genre }}</h6>
                  </div>
                                
                  <hr>
                  <h6>Content</h6>
                  <p>{{ post.content }}</p>
                  <p>{{post.time}}</p>
                </div>
                <div class="float-end">
                  
                </div>
              </div>
            </div>
          </div>
          <div class="cards mt-2" v-if="errorMessage" >
            <p style="color: red; font-size: larger; font-weight: bold;" class="text-center">{{ errorMessage }}</p>
          </div>
            <button @click="fetchNextPage" class="mt-2 btn btn-primary" >Load More</button>         
        </div>
        
        
    </div>
</template>
<script setup>
  import {onMounted, ref, } from 'vue';
  import { onSnapshot,collection, query, addDoc, getDocs, doc, getDoc, where, Timestamp, orderBy} from 'firebase/firestore';
  import { auth } from '../firebase/index.js';
  import { db } from '../firebase';
  import { startAfter,limit } from 'firebase/firestore';
  
  

// const cheapTalkCollection = collection(db,'cheapTalk');
  // const userRef = cheapTalkCollection.doc("id")
  
const genre = ref('');
const content = ref('');
const errorMessage = ref('');

const addPost = async () => {
  if (genre.value !== '' && content.value !== '') {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userId = currentUser.uid;
      let fullName = '';
      let gender = '';
      let username ='';

      // Retrieve the fullName from the "cheapTalk" collection using the userId
      const cheapTalkQuerySnapshot = await getDocs(query(collection(db, 'cheapTalk'), where('uid', '==', userId)));
      if (!cheapTalkQuerySnapshot.empty) {
        const document = cheapTalkQuerySnapshot.docs[0];
        const cheapTalkData = document.data();
        fullName = cheapTalkData.fullName;
        gender = cheapTalkData.gender;
        username =cheapTalkData.username;
      } else {
        console.log("No matching document found in 'CheapTalk' collection.");
      }
      
      //this is to get a timestamp data in every post of the user
      const timestamp= Timestamp.fromDate(new Date());

      //Each property in the postDoc object holds specific information related to a post. dire mastore ang gi input sa user and pass it to the addDoc para ma add as a document
      const postDoc = {
        genre: genre.value,
        content: content.value,
        userId: userId,
        gender: gender,
        fullName: fullName,
        username:username,
        time:timestamp,
        completed: false
      };
     
     // await kay ga wait pa siyas promise SA babaw 
      try {
        await addDoc(collection(db, 'posts'), postDoc);
        console.log('Post document successfully added.');
      } catch (error) {
        console.log('Error adding post document:', error);
      }
      
    }
    genre.value = '';
    content.value = '';

    // router.push('/home');
  }
  
};



//maoni sakto if di mag loadmore
const posts = ref([]);
onMounted(async () => {
  const currentUser = auth.currentUser;
  const userId = currentUser.uid;
  
      
      const qPost = query(collection(db, 'posts'), where('userId', '==', userId));
      onSnapshot(qPost, (snapshot) => {
        const postTmp = [];

        snapshot.forEach((doc) => {
          const post = {
            id: doc.id,
            genre: doc.data().genre,
            content: doc.data().content,
            userId: doc.data().userId,
            fullName: doc.data().fullName,
            gender: doc.data().gender,
            time:doc.data().time?.toDate()?.toLocaleString(),  
            completed: doc.data().completed,
          };
          postTmp.push(post);
        });

        posts.value = postTmp;
      });

    } 
);


//loading loading
//   const posts = ref([]);
// const pageSize = 6;
// let lastVisible = null;
// const errorMessage= ref('');


// const fetchData = async () => {
//   const currentUser = auth.currentUser;
//   const userId = currentUser.uid;
//   try {
//     const qPost = query(collection(db, 'posts'), where('userId', '==', userId), orderBy('time'), limit(pageSize));
//     const snapshot = await getDocs(qPost);

//     if (!snapshot.empty) {
//       const postTmp = [];
//       snapshot.forEach((doc) => {
//         const post = {
//           id: doc.id,
//           genre: doc.data().genre,
//           content: doc.data().content,
//           userId: doc.data().userId,
//           fullName: doc.data().fullName,
//           gender: doc.data().gender,
//           time: doc.data().time?.toDate()?.toLocaleString(),
//           completed: doc.data().completed,
//         };
//         postTmp.push(post);
//       });
//       posts.value = postTmp;  
//       lastVisible = snapshot.docs[snapshot.docs.length - 1];
//     } else {
//       console.log("No posts found");
//       errorMessage.value = 'No posts found';
//     alert(errorMessage.value);
//     }
//   } catch (error) {
//     console.log('Error getting user posts:', error);
//     errorMessage.value = 'Error getting user posts';
//     // alert(errorMessage.value);
//   }
// };

// const fetchNextPage = async () => {
//   try {
//     const qPost = query(collection(db, 'posts'),where('userId', '==', userId), orderBy('time'), startAfter(lastVisible), limit(pageSize));
//     const snapshot = await getDocs(qPost);

//     if (!snapshot.empty) {
//       const postTmp = [];
//       snapshot.forEach((doc) => {
//         const post = {
//           id: doc.id,
//           genre: doc.data().genre,
//           content: doc.data().content,
//           userId: doc.data().userId,
//           fullName: doc.data().fullName,
//           gender: doc.data().gender,
//           time: doc.data().time?.toDate()?.toLocaleString(),
//           completed: doc.data().completed,
//         };
//         postTmp.push(post);
//       });
//       posts.value = [...posts.value, ...postTmp];
//       lastVisible = snapshot.docs[snapshot.docs.length - 1];
//     } else {
//       console.log("No more posts to fetch");
//       errorMessage.value = 'No more posts to load';
//       alert(errorMessage.value);
//     }
//   } catch (error) {
//     console.log('Error fetching next page:', error);
//     errorMessage.value = 'Error fetching next page';
//     alert(errorMessage.value);
//   }

// };

// onMounted(fetchData);
</script>