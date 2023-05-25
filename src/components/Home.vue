<template>
  <div class="container">
   
    <div class="row">
      <h1>List of Posts</h1>     
      <hr>
      <div class="d-flex">
        <div class=" flex-grow-1">
          <select class="form-select" aria-label="Sort Category" style="width:200px" v-model="filterGenre">
            <option selected disabled>Sort Category</option>
            <option value="">All</option>
            <option value="Religion">Religion</option>
            <option value="Education">Education</option>
            <option value="Politics">Politics</option>
            <option value="Romance">Romance</option>
            <option value="Comedy">Comedy</option>
          </select>
        </div>
     
      </div>
      
        <div class="col-md-4" v-for="post in filteredPosts" :key="post.posts" >

          <div class="cards"  >
                <div class="card mt-3 text-dark"  :style="{ backgroundColor: post.gender === 'female' ? 'pink'  : '#19A7CE' }">
                    <div class="card-body">
                        <div class="d-flex">
                        <div class="flex-grow-1">
                            <h6>{{ post.fullName }}</h6>
                            <p>{{ post.username }}</p>
                        </div>
                        <h6>{{ post.genre }}</h6>
                        </div>
                    
                        <hr>
                        <h6>Content</h6>
                        <p>{{ post.content }}</p>
                        <p>{{ post.time }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="cards mt-2" v-if="errorMessage" >
          <p style="color: red; font-size: larger; font-weight: bold;" class="text-center">{{ errorMessage }}</p>
        </div>
        <div>
          <!-- Previous button -->
          <button @click="fetchPreviousPage" :disabled="currentPage === 1" class="btn btn-info">Previous</button>
        
          <!-- Page numbers -->
          <span v-for="page in totalPages" :key="page">
            <button @click="goToPage(page)" :disabled="currentPage === page" class="btn btn-info">{{ page }}</button>
          </span>
        
          <!-- Next button -->
          <button @click="fetchNextPage" :disabled="currentPage === totalPages" class="btn btn-info">Next</button>
        </div>
        
        <!-- <button @click="fetchNextPage" class="mt-2 btn btn-primary" >Load More</button>          -->
    </div>
   
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
    import {db} from '../firebase/index.js'
    import { collection, onSnapshot} from "firebase/firestore";
    import { query } from 'firebase/firestore';
    import { computed } from 'vue';
    import { watch } from 'vue';
    import { orderBy, limit, startAfter, limitToLast, endBefore} from 'firebase/firestore';
    import { getDocs } from 'firebase/firestore'; 
    
    


const id = ref('1');
const posts = ref([]);
const qPost = query(collection(db, 'posts'));
const filterGenre = ref('');
const errorMessage = ref('');

const filteredPosts = computed(() => {
  let filtered = posts.value;

  if (filterGenre.value) {
    filtered = filtered.filter(post => post.genre === filterGenre.value);
    return filtered.sort((a, b) => a.genre.localeCompare(b.genre));
  } else {
    return posts.value;
  }
  
});

// const pageSize = 6;
// let lastVisible = null;


// const fetchData = async () => {
//   try {
//     const qPost = query(collection(db, 'posts'), orderBy('time'), limit(pageSize));
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
//     }
//   } catch (error) {
//     console.log('Error getting user posts:', error);
//     errorMessage.value = 'Error getting user posts';
//   }
// };

// const fetchNextPage = async () => {
//   try {
//     const qPost = query(collection(db, 'posts'), orderBy('time'), startAfter(lastVisible), limit(pageSize));
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
//     }
//   } catch (error) {
//     console.log('Error fetching next page:', error);
//     errorMessage.value = 'Error fetching next page';
//   }
//   // return {
//   //     // Access the posts and errorMessage from the imported module
//   //     posts,
//   //     errorMessage,
//   //     fetchNextPage,
//   //   };
// };

// onMounted(fetchData);

const pageSize = 4;
let lastVisible = null;

const currentPage = ref(0);
const totalPages = ref(0);

const fetchData = async () => {
  try {
    const qPost = query(collection(db, 'posts'), orderBy('time'), limit(pageSize));
    const snapshot = await getDocs(qPost);

    if (!snapshot.empty) {
      const postTmp = [];
      snapshot.forEach((doc) => {
        const post = {
          id: doc.id,
          genre: doc.data().genre,
          content: doc.data().content,
          userId: doc.data().userId,
          fullName: doc.data().fullName,
          gender: doc.data().gender,
          username:doc.data().username,
          time: doc.data().time?.toDate()?.toLocaleString(),
          completed: doc.data().completed,
        };
        postTmp.push(post);
      });
      posts.value = postTmp;
      lastVisible = snapshot.docs[snapshot.docs.length - 1];
      totalPages.value = Math.ceil(snapshot.size / pageSize);
    } else {
      console.log("No posts found");
      errorMessage.value = 'No posts found';
    }
  } catch (error) {
    console.log('Error getting user posts:', error);
    errorMessage.value = 'Error getting user posts';
  }
};



const fetchNextPage = async () => {
  try {
    const qPost = query(collection(db, 'posts'), orderBy('time'), startAfter(lastVisible), limit(pageSize));
    const snapshot = await getDocs(qPost);

    if (!snapshot.empty) {
      const postTmp = [];
      snapshot.forEach((doc) => {
        const post = {
          id: doc.id,
          genre: doc.data().genre,
          content: doc.data().content,
          userId: doc.data().userId,
          fullName: doc.data().fullName,
          gender: doc.data().gender,
          time: doc.data().time?.toDate()?.toLocaleString(),
          completed: doc.data().completed,
        };
        postTmp.push(post);
      });
      posts.value = [...posts.value, ...postTmp]; // is using the spread syntax (...) to concatenate two arrays and update the value of the posts ref object.
      lastVisible = snapshot.docs[snapshot.docs.length - 1];
      currentPage.value++;
    } else {
      console.log("No more posts to fetch");
      errorMessage.value = 'No more posts to fetch';
    }
  } catch (error) {
    console.log('Error fetching next page:', error);
    errorMessage.value = 'Error fetching next page';
  }
};

const goToPage = async (page) => {
  try {
    const qPost = query(collection(db, 'posts'), orderBy('time'), limit(pageSize), startAfter(lastVisible), endBefore(lastVisible), limitToLast(pageSize * page));
    const snapshot = await getDocs(qPost);

    if (!snapshot.empty) {
      const postTmp = [];
      snapshot.forEach((doc) => {
        const post = {
          id: doc.id,
          genre: doc.data().genre,
          content: doc.data().content,
          userId: doc.data().userId,
          fullName: doc.data().fullName,
          gender: doc.data().gender,
          time: doc.data().time?.toDate()?.toLocaleString(),
          completed: doc.data().completed,
        };
        postTmp.push(post);
      });
      posts.value = postTmp;
      lastVisible = snapshot.docs[snapshot.docs.length - 1];
      currentPage.value = page;
    } else {
      console.log("No posts found");
      errorMessage.value = 'No posts found';
    }
  } catch (error) {
    console.log('Error fetching page:', error);
    errorMessage.value = 'Error fetching page';
  }
};



const fetchPreviousPage = async () => {
  try {
    if (currentPage.value > 1) {
      const qPost = query(collection(db, 'posts'), orderBy('time'), endBefore(lastVisible), limitToLast(pageSize));
      const snapshot = await getDocs(qPost);

      if (!snapshot.empty) {
        const postTmp = [];
        snapshot.forEach((doc) => {
          const post = {
            id: doc.id,
            genre: doc.data().genre,
            content: doc.data().content,
            userId: doc.data().userId,
            fullName: doc.data().fullName,
            gender: doc.data().gender,
            time: doc.data().time?.toDate()?.toLocaleString(),
            completed: doc.data().completed,
          };
          postTmp.push(post);
        });
        posts.value = postTmp.reverse();
        lastVisible = snapshot.docs[0];
        currentPage.value--;
      } else {
        console.log("No more posts to fetch");
        errorMessage.value = 'No more posts to fetch';
      }
    }
  } catch (error) {
    console.log('Error fetching previous page:', error);
    errorMessage.value = 'Error fetching previous page';
  }
};




onMounted(fetchData);


  


</script>