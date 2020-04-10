<template>
    <div class="form sell">
                <form @submit.prevent="handleSubmit">
                    <div class="container">
                        <label for="title">
                            Title
                        </label>
                        <input v-model="$v.form.title.$model" type="text" name="title" placeholder="Enter Product Title" />
                        <label for="imageUrl">
                            Image URL
                        </label>
                        <input v-model="$v.form.imageUrl.$model" type="text" name="imageUrl" placeholder="Enter the url of your product" />
                        <label for="description">
                            Description
                        </label>
                        <textarea v-model="$v.form.description.$model" rows="3" id="description" placeholder="Enter description" name="description"></textarea>
                        <label for="price">
                            Price
                        </label>
                        <input v-model="$v.form.price.$model" type="number" name="price" placeholder="Enter product price" />
                        <button type="submit" class="SubmitButton">Sell</button>
                    </div>
                </form>
            </div>
</template>

<script>
import formHandler from '../../mixins/formHandler';
import { validationMixin } from 'vuelidate';
import { minLength, maxLength, required } from 'vuelidate/lib/validators';

const positiveNumeric = value => {if(value.trim() == '') return true; return Number(value) > 1 ? true : false;}
const isImageUrl = value => {if(value.trim() == '') return true; return value && (value.startsWith('https') || value.startsWith('http')) && (value.endsWith('.png') || value.endsWith('.jpeg') || value.endsWith('.jpg'));}

export default {
    mixins:[validationMixin,formHandler],
    name: "Sell",
    data(){
        return {
            form:{
                title:'',
                imageUrl:'',
                description:'',
                price:'',
                creator: this.$cookies.get('username')
            },
            errors:{
                title:{
                    required: "Title is required!",
                    minLength: "Title must be at least 5 chars long!"
                },
                imageUrl:{
                    required:"Image Url is required!",
                    isImageUrl:"Image Url is invalid!"
                },
                description:{
                    required:"Description is required!",
                    minLength: "Description must be between 10 and 150 chars long!",
                    maxLength: "Description must be between 10 and 150 chars long!",
                },
                price:{
                    required:"Price is required!",
                    positiveNumeric:"Price must be positive number!",
                },
            }
        }
    },
    validations:{
        form:{
            title:{
                required,
                minLength: minLength(5)
            },
            imageUrl:{
                required,
                isImageUrl
            },
            description:{
                required,
                minLength: minLength(10),
                maxLength: maxLength(150),
            },
            price:{
                required,
                positiveNumeric,
            },
        }
    },
    methods:{
        handleSubmit(){
            this.$submit('http://localhost:9999/feed/product/create',() => {
                this.$router.push('/shop');
            },{ "Content-Type": "application/json", token: this.$cookies.get('token') });
        }
    }
}
</script>