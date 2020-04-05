<template>
  <fragment>
    <p class="inventoryInfo">Here are all products you currently possess, have sold or are selling</p>
    <p
      class="moreInfo"
    >Press one of the buttons bellow to browse the inventory and click the "go back" button to go back.</p>

    <div class="selectableButtons">
      <router-link to='/inventory/selling' class="selling">Selling products</router-link>
      <router-link to='/inventory/sold' class="sold">Sold products</router-link>
      <router-link to='/inventory/bought' class="bought">Bought products</router-link>
    </div>
  </fragment>
</template>

<script>
import {Fragment} from 'vue-fragment';
export default {
    name:'InventoryView',
    components:{
        Fragment
    }
};
</script>

<style>
main .inventoryInfo,
main .moreInfo {
  color: white;
  font-size: 3rem;
  text-align: center;
  font-weight: bold;
}

main .moreInfo {
  font-size: 1.5rem;
  width: 50%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.selectableButtons {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.selectableButtons a {
  text-align: center;
  outline: none;
  width: 50%;
  padding: 1.8rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  color: white;
  font-weight: bolder;
  background: transparent;
  border-radius: 5px;
  border-color: #491bef;
  border-width: 5px;
  border-style: solid;

  transition: 0.3s background-color;
}

.selectableButtons a:hover {
  background: #491bef;
}

.goBackBtn {
  outline: none;
  padding: .8rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  color: white;
  margin-top: 3rem;
  margin-left: 1rem;
  margin-bottom: 0%;
  font-weight: bolder;
  background: transparent;
  border-radius: 5px;
  border-color: #491bef;
  border-width: 3px;
  border-style: solid;
  transition: 0.3s background-color;
}

.goBackBtn:hover {
  background: #491bef;
}

</style>