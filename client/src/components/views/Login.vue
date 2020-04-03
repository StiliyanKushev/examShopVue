<template>
    <div class="form">
                <form @submit.prevent="handleSubmit">
                    <div class="container">
                        <label for="email">
                            Email
                        </label>
                        <input v-model="$v.form.email.$model" type="text" name="email" placeholder="Enter Email" />
                        <label for="password">
                            Password
                        </label>
                        <input v-model="$v.form.password.$model"  type="password" name="password" placeholder="Enter Password" />
                        <button type="submit" class="SubmitButton">Login</button>
                    </div>
                    <div class="otherOption">
                        <p>Don't have an account? <router-link to="/register">Register.</router-link></p>
                    </div>
                </form>
            </div>
</template>

<script>
import userHandler from '../../handlers/user';
import { validationMixin } from 'vuelidate';
import { minLength, email, required } from 'vuelidate/lib/validators';
export default {
    mixins:[validationMixin],
    name: 'LoginView',
    data(){
        return {
            form:{
                email:'',
                password:'',
            }
        }
    },
    validations:{
        form:{
            email:{
                required,
                email
            },
            password:{
                required,
                minLength: minLength(8)
            }
        }
    },
    methods:{
        handleSubmit(){
            this.$v.form.$touch();

            if(this.$v.form.$invalid){
                //vue notify errors
                let errors = [];

                if(!this.$v.form.email.required) errors.push("Email is required!");
                if(!this.$v.form.email.email) errors.push("Email is invalid!");
                if(!this.$v.form.password.required) errors.push("Password is required!");
                if(!this.$v.form.password.minLength) errors.push("Password must be at least 8 chars long!");

                for(let err of errors) this.$vToastify.error({title:" ", body: err });
            }
            else{
                this.$http.post("http://localhost:9999/auth/login",this.form)
                .then((res) => {
                    if(!res.data.success){
                        this.$vToastify.error({title:" ", body: res.data.message });
                    }
                    else{
                        this.$vToastify.success({title:" ", body: res.data.message });
                        userHandler.saveUser(res.data.token,res.data.user.username,res.data.user.roles);
                        this.$router.push('/');// redirect to home
                    }
                });
            }
        }
    }
}
</script>