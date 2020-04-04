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
import { validationMixin } from 'vuelidate';
import { minLength, maxLength, numeric, required } from 'vuelidate/lib/validators';

const positiveNumeric = value => Number(value) > 1 ? true : false;
const isImageUrl = value => value && (value.startsWith('https') || value.startsWith('http')) && (value.endsWith('.png') || value.endsWith('.jpeg') || value.endsWith('.jpg'));

export default {
    mixins:[validationMixin],
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
                numeric,
                positiveNumeric,
            },
        }
    },
    methods:{
        handleSubmit(){
            this.$v.form.$touch();

            if(this.$v.form.$invalid){
                //vue notify errors
                let errors = [];

                if(!this.$v.form.title.required) errors.push("Title is required!");
                if(!this.$v.form.title.minLength) errors.push("Title must be at least 5 chars long!");

                if(!this.$v.form.imageUrl.required) errors.push("Image Url is required!");
                if(!this.$v.form.imageUrl.isImageUrl) errors.push("Image Url is invalid!");

                if(!this.$v.form.description.required) errors.push("Description is required!");
                if(!this.$v.form.description.minLength || !this.$v.form.description.maxLength) errors.push("Description must be between 10 and 150 chars long!");

                if(!this.$v.form.price.required) errors.push("Price is required!");
                else if (!this.$v.form.price.numeric || !this.$v.form.price.positiveNumeric) errors.push("Price must be positive number!");

                for(let err of errors) this.$vToastify.error({title:" ", body: err });
            }
            else{
                this.$http.post("http://localhost:9999/feed/product/create",this.form,{
                    headers: { "Content-Type": "application/json", token: this.$cookies.get('token') }
                })
                .then((res) => {
                    if(!res.data.success){
                        this.$vToastify.error({title:" ", body: res.data.message });
                    }
                    else{
                        this.$vToastify.success({title:" ", body: res.data.message });
                        this.$router.push('/shop');// redirect to shop
                    }
                });
            }
        }
    }
}
</script>