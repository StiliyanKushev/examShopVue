<template>
    <div class="form register">
                <form @submit.prevent="handleSubmit">
                    <div class="container">
                        <label for="username">
                            Username
                    </label>
                        <input v-model="$v.form.username.$model" type="text" name="username" placeholder="Enter Username" />
                        <label for="email">
                            Email
                    </label>
                        <input v-model="$v.form.email.$model" type="text" name="email" placeholder="Enter Email" />
                        <label for="password">
                            Password
                    </label>
                        <input v-model="$v.form.password.$model" type="password" name="password" placeholder="Enter Password" />
                        <button type="submit" class="SubmitButton">Register</button>
                    </div>
                    <div class="otherOption">
                        <p>Have an account? <router-link to="/login">Login.</router-link></p>
                    </div>
                </form>
            </div>
</template>

<script>
import userHandler from '../../handlers/user';
import formHandler from '../../mixins/formHandler';
import { validationMixin } from 'vuelidate';
import { minLength, email, required } from 'vuelidate/lib/validators';
export default {
    mixins:[formHandler,validationMixin],
    name: 'RegisterView',
    data(){
        return {
            form:{
                username:'',
                email:'',
                password:'',
            },
            errors:{
                username:{
                    required:'Username is required!',
                    minLength: 'Username must be at least 4 chars long!'
                },
                email:{
                    required: 'Email is required!',
                    email: 'Email is invalid!'
                },
                password:{
                    required: 'Password is required!',
                    minLength: 'Password must be at least 8 chars long!'
                }
            }
        }
    },
    validations:{
        form:{
            username:{
                required,
                minLength: minLength(4)
            },
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
            this.$submit("http://localhost:9999/auth/register",(res) => {
                userHandler.saveUser(res.data.token,res.data.user.username,res.data.user.roles);
                this.$router.push('/');// redirect to home
            });
        }
    }
}
</script>