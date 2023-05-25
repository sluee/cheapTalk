  <template>
    <section>
      <div class="p-5 bg-image" style="
        background-color: purple;
        height: 300px;
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
              <h2 class="fw-bold text-center">Login to CheapTalk</h2>
              <hr>
              <div class="alert alert-danger" v-show="error">
                {{ errorMsg }}
            </div>
            <div class="alert alert-success" v-show="success">
                {{ successMsg }}
            </div>
              <form>
                <div class="form-outline 8 mb-2">
                  <input type="email" id="form3Example3" class="form-control" placeholder="name@email.com" v-model="email"/>
                  <label class="form-label" for="form3Example3">Email address</label>
                </div>
                <div class="form-outline mb-2">
                  <input type="password" id="form3Example4" class="form-control" placeholder="Must contain at least 6-8 characters" v-model="password"/>
                  <label class="form-label" for="form3Example4">Password</label>
                </div>  
                <!-- Submit button -->
                <div class="d-flex">
                  <div class="flex-grow-1">
                      <router-link to="register" style="text-decoration: none; color:black">Don't have an account yet? <span style="color:blue; text-decoration:underline;">Register here</span></router-link>
                  </div>
                 <button type="button" class="btn btn-primary mb-3 justify-content-end px-5" @click="loginUser" >Login</button>
              </div>
              </form>
            </div>
          </div>
        

            <!-- Register buttons -->
            <div class="text-center">
              <p>or sign up with:</p>
              <button type="button" class="btn btn-primary btn-floating mx-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
              </svg>
              </button>

              <button type="button" class="btn btn-primary btn-floating mx-1" @click="signInWithGoogle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
              </svg>
              </button>

              <button type="button" class="btn btn-primary btn-floating mx-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </button>

              <button type="button" class="btn btn-primary btn-floating mx-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-apple" viewBox="0 0 16 16">
                  <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"/>
                  <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"/>
              </svg>
              </button>
            </div>
        </div>
      </div>
  </section>
  <!-- Section: Design Block -->
</template>

<script setup>
  import { ref } from 'vue'
    import { auth } from '../firebase/index.js'
    import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
    import router from '../router/index.js';

    const email         =   ref('');
    const password      =   ref('');
    const error         =   ref('');
    const errorMsg      =   ref('');
    const success       =   ref('');
    const successMsg    =   ref('');

    const loginUser = () => {
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((cred) =>{
                if(cred.user.emailVerified){
                    router.push('/home')
                }else{
                    error.value= true
                    errorMsg.value="Your account is not yet verified."
                    email.value=""
                    password.value=''
                }
            })
            .catch((err)=>{
                error.value= true
                errorMsg.value= err.message
            })
    }

    const signInWithGoogle = () =>{
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((cred)=>{
                console.log(cred.user)
                router.push('/home')
        })
        .catch((err)=>{
            error.value= true
            errorMsg.value = err.message
        })
    }
    
</script>