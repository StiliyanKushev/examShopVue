<template>
  <div class="inventory-holder">
    <router-link to="/inventory" class="goBackBtn">go back</router-link>
    <ShopView :isStatic="isStatic" :products="products"/>
  </div>
</template>

<script>
import ShopView from '../views/Shop';
export default {
    name:'InventoryPartialView',
    components:{
        ShopView
    },
    props:{
        view:String
    },
    data(){
        return {
            products: this.fetchProducts(),
        }
    },
    computed:{
        isStatic(){
            if(this.view == 'selling') return false;
            return true;
        }
    },
    methods:{
        fetchProducts(){
            this.$http.get(`http://localhost:9999/feed/products/${this.view}`,{
                headers: { "Content-Type": "application/json", token: this.$cookies.get('token'),username: this.$cookies.get('username')}
            })
            .then((res) => {
                this.products = res.data.products;
            })

            return [];
        }
    }
};
</script>

<style>
.inventory-holder{
    padding-top: 3rem;
}
</style>