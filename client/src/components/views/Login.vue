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
import formHandler from '../../mixins/formHandler';
import { validationMixin } from 'vuelidate';
import { minLength, email, required } from 'vuelidate/lib/validators';
export default {
    mixins:[validationMixin,formHandler],
    name: 'LoginView',
    data(){
        return {
            form:{
                email:'',
                password:'',
            },
            errors:{
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
            this.$submit("http://localhost:9999/auth/login",(res) => {
                userHandler.saveUser(res.data.token,res.data.user.username,res.data.user.roles);
                this.$router.push('/');// redirect to home
            });
        }
    }
}
</script>