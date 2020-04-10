<template>
    <fragment>
        <p class="latestProducts">Welcome! See our latest products</p>
        <ShopView :isStatic="true" v-if="products.length > 0" :products="products" />
    </fragment>
</template>

<script>
import {Fragment} from 'vue-fragment';
import ShopView from './Shop';
export default {
    name: 'HomeView',
    components:{
        Fragment,
        ShopView
    },
    created(){
        this.fetchProducts();
    },
    data(){
        return {
            products: [],
        }
    },
    methods:{
        fetchProducts(){
            this.$http.get('http://localhost:9999/feed/products/latest')
            .then((res) => {
                this.products = res.data.products;
            });
        }
    }
}
</script>

<style>

main .latestProducts {
  color: white;
  font-size: 3rem;
  text-align: center;
  font-weight: bold;
}

</style>