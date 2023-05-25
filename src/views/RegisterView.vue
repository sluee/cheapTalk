<template>
<section>
    <div class="p-5 bg-image" style="
          background-color: purple;
          height: 270px;
          ">
      </div>

  
    <div class="card  shadow-5-strong" style="
          margin-top: -220px;
          background: hsla(0, 0%, 100%, 0.8);
          backdrop-filter: blur(30px);
          width:50%;
          margin-left: 52vh;
          ">
      <div class="card-body ">
  
        <div class="row d-flex justify-content-center">
          <div class="col-lg-9">
            <h2 class="fw-bold text-center">Register to CheapTalk</h2>
            <hr>
            <div class="alert alert-danger" v-show="error">
              {{ errorMsg }}
          </div>
          <div class="alert alert-success" v-show="success">
              {{ successMsg }}
          </div>
            <form>
                  <div class="form-outline">
                    
                    <input type="text" id="fullName" class="form-control" v-model="fullName" />
                    <label class="form-label" for="fullName">Name</label>
                  </div>
                  <div class="form-outline">
                    <input type="text" id="username" class="form-control" v-model="username" />
                    <label class="form-label" for="username">Username</label>
                  </div>
                  <div class="form-outline ">
                
                    <select class="form-select" aria-label="Gender:" v-model="gender">
                      <option hidden>Select Gender</option>
                      <option disabled>Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <label class="form-label" for="form3Example2">Gender</label>
                  </div>
              
              
              <div class="form-outline 8 mb-2">
                <input type="email" id="email" class="form-control" placeholder="name@email.com"  v-model="email"/>
                <label class="form-label" for="email">Email address</label>
              </div>
              <div class="form-outline mb-2">
                <input type="password" id="pass" class="form-control" placeholder="Must contain at least 6-8 characters" v-model="password"/>
                <label class="form-label" for="pass">Password</label>
              </div>  
              <!-- <div class="form-outline mb-2">
                <input type="password" id="form3Example4" class="form-control" placeholder="Must contain at least 6-8 characters" />
                <label class="form-label" for="form3Example4">Confirm Password</label>
                <div v-if="!passwordsMatch.value">Passwords do not match</div>
              </div>   -->
              <!-- Submit button -->
              <div class="d-flex">
                <div class="flex-grow-1">
                    <router-link to="login" style="text-decoration: none; color:black">Already have an account? <span style="color:blue; text-decoration:underline;">Login here</span></router-link>
                </div>
               <button type="button" class="btn btn-primary mb-3 justify-content-end px-4" @click="register">Register</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
 
</template>

<script setup>
    import { ref } from 'vue'
   import { auth } from '../firebase';
    import { createUserWithEmailAndPassword, sendEmailVerification} from'firebase/auth';
    import { db } from '../firebase';
    import { collection, addDoc} from '@firebase/firestore';
    
    const fullName           =   ref('');
    const gender             =   ref('');
    const email              =   ref('');
    const username           =   ref('');
    const password           =   ref('');
    const error              =   ref('');
    const errorMsg           =   ref('');
    const success            =   ref('');
    const successMsg         =   ref('');
    const verified = ref('')

  //   const formData = reactive({
  //     password: '',
  //     confirmPassword: ''
  //   });

  //   const passwordsMatch = reactive({
  //     value: false
  //   });

  //   watch([() => password, () => confirmPassword], () => {
  //   passwordsMatch.value = password === confirmPassword;
  // });

    

    // const register = async () =>{
    //   try{}
    //     if(email.value !='' || password.value !=''){
    //       const { user } = await createUserWithEmailAndPassword(auth, email.value, password.value);
    //         await addDoc(collection(db,'cheapTalk'),{
               
    //             fullName:fullName.value,
    //             gender:gender.value,
    //             username:username.value,
    //             email:email.value,
    //             uid: user.uid,
    //             completed: false
    //         })

    //         createUserWithEmailAndPassword(auth, email.value, password.value)
    //         .then ((cred)=>{
    //             console.log('user created', cred.user)
    //             email.value     =''
    //             password.value  =''
    //             sendEmailVerification(cred.user)
    //             error.value = false
    //             success.value=true
    //             successMsg.value="Register Successfully! A verification link has been sent to your email."
    //         })
    //         .catch((err)=>{
    //             error.value= true
    //             errorMsg.value= err.message
    //         })
    //     }else{
    //         error.value= true
    //         errorMsg.value="Please fill out all the fields"
    //     }
    // }

    const register = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (fullName.value !== '' && username.value !== '' && gender.value !== '' && email.value !== '' && password !== '') {
    if (!emailRegex.test(email.value)) {
      error.value = true;
      errorMsg.value = 'FirebaseError: Firebase: Error (auth/invalid-email).';
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email.value, password.value);
      
      await addDoc(collection(db, "cheapTalk"), {
        fullName: fullName.value,
        username: fullName.value,
        gender: gender.value,
        email: email.value,
        uid: user.uid,
        completed: false
      });

      sendEmailVerification(user);

      error.value = false;
      success.value = true;
      successMsg.value="Register Successfully! A verification link has been sent to your email."
      



      fullName.value = '';
      username.value = '';
      gender.value = '';
      email.value = '';
      password.value = null;

    } catch (error) {
      error.value = true;
      errorMsg.value = error;
    }
  } else {
    error.value = true;
    errorMsg.value = 'FirebaseError: Firebase: Error (auth/fields-is-empty)';
  }
}


</script>