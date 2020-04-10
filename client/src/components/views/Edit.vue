<template>
  <div class="form sell">
    <form @submit.prevent="handleSubmit">
      <div class="container">
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          v-model="$v.form.title.$model"
          placeholder="Enter new product Title"
        />
        <label for="imageUrl">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          v-model="$v.form.imageUrl.$model"
          placeholder="Enter the new url of your product"
        />
        <label for="description">Description</label>
        <textarea rows="3" id="description" v-model="$v.form.description.$model" placeholder="Enter description" name="description"></textarea>
        <label for="price">Price</label>
        <input
          type="number"
          name="price"
          v-model="$v.form.price.$model"
          placeholder="Enter new product price"
        />
        <button type="submit" class="SubmitButton">Edit & Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import formHandler from '../../mixins/formHandler';
import { validationMixin } from 'vuelidate';
import { minLength, maxLength, numeric, required } from 'vuelidate/lib/validators';

const positiveNumeric = value => Number(value) > 1 ? true : false;
const isImageUrl = value => value && (value.startsWith('https') || value.startsWith('http')) && (value.endsWith('.png') || value.endsWith('.jpeg') || value.endsWith('.jpg'));

export default {
    mixins:[validationMixin,formHandler],
    name: "EditView",
    data(){
        return {
            form:{
                title:this.$route.query.title,
                imageUrl:this.$route.query.imageUrl,
                description:this.$route.query.description,
                price:this.$route.query.price.toString(),
                creator: this.$route.query.creator
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
                numeric,
                positiveNumeric,
            },
        }
    },
    methods:{
        handleSubmit(){
            this.$submit(`http://localhost:9999/feed/product/edit/${this.$route.params.id}`,() => {
                this.$router.push('/shop');
            },{ "Content-Type": "application/json", token: this.$cookies.get('token') });
        }
    }
}
</script>