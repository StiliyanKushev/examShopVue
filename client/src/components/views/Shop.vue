<template>
  <div class="shopListDiv">
    <ul class="shopList">
      <li v-for="p in currentProducts" :key="p._id">
        <Product :source="p" :isStatic="isStatic" />
      </li>
    </ul>
  </div>
</template>

<script>
import EventBus from '../../EventBus';
import Product from '../partials/Product';
export default {
  name: "ShopView",
  props: {
    products: Array,
    isStatic: Boolean,
  },
  mounted(){
    EventBus.$on('removeById',(id) => {
      for(let j = 0; j < this.currentProducts.length;j++){
          let e = this.currentProducts[j];
          if(e._id == id){
            this.currentProducts.splice(j,1);
            break;
          }
      }
    });
  },
  data(){
      return {
          currentProducts: this.products || this.fetchProducts()
      }
  },
  methods:{
      fetchProducts(){
          this.$http.get('http://localhost:9999/feed/products')
            .then((res) => {
                this.currentProducts = res.data.products;
            })

            return [];
      }
  },
  components:{
      Product
  },
};
</script>

<style>
.shopListDiv {
  margin-left: 10rem;
  margin-right: 10rem;
  margin-top: 3rem;
  margin-bottom: 7rem;
}

.shopList {
  width: 100%;
  margin: 0%;
  padding: 0%;
  display: grid;
  grid-gap: 9rem 5rem;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-auto-rows: 28rem;
  grid-auto-flow: row dense;
}

.shopList li {
  list-style-type: none;
  height: fit-content;
  background: white;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 2rem;

  background: #491bef;
  padding: 0.1rem;
  color: white;
}

</style>