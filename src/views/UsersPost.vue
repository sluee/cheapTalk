<template>
  
    <div class="container">
        <p> {{ name }} Posts</p>
        <p v-if="posts.length > 1" class="text-sm text-black font-light"> {{ posts.length }} posts </p>
        <p v-else class="text-sm text-black font-light"> {{ posts.length }} post</p>
      
        <hr>
        <div class="row">
            <div class="col-md-4"  v-for="post in posts" :key="post.posts" >
              <div class="cards"  >
                    <div class="card mt-5 text-dark"  :style="{ backgroundColor: gender === 'female' ? 'pink'  : '#19A7CE' }">
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
                           
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>



<script setup>

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { collection, query, onSnapshot, where, orderBy} from 'firebase/firestore'
import { db } from '../firebase/index.js'


const posts = ref([])
const postsRef = collection(db, 'posts')
const userRef = collection(db, 'cheapTalk')
const name = ref('')
const gender = ref('')
const username = ref('')

onMounted(() => {
    const route = useRoute()
    const cheapTalk_id = route.params.uid  
    
    const qPost = query(postsRef, where('userId', '==', cheapTalk_id))
    const qUser = query(userRef, where('uid', '==', cheapTalk_id))
    onSnapshot(qUser, (querySnapshot) => {
        querySnapshot.docs.map((docs) => {
            name.value = docs.data().fullName 
            console.log(name.value)
            gender.value = docs.data().gender
            username.value =docs.data().username
        })
    });
    onSnapshot(qPost, (querySnapshot) => {
        const postsTmp = []
        querySnapshot.forEach((doc) => {
            const post = {
                userId: doc.data().userId,
                genre: doc.data().genre,
                content: doc.data().content,    
                fullName: doc.data().fullName,
                gender: doc.data().gender,
                username:doc.data().username,
                time: doc.data().time?.toDate()?.toLocaleString(),
            }
            postsTmp.push(post)
        })
        console.log(postsTmp)
        posts.value = postsTmp
    });
})


   

  
</script>

