<template>
  <div class="productContainer">
    <div class="title">
      <p>{{source.title}}</p>
      <p class="creator">{{source.creator}}</p>
      <p class="price">{{source.price}}$</p>
    </div>
    <div class="image" :style="{ 'background-image': 'url(' + source.imageUrl + ')' }"></div>
    <div class="description">
      <p>{{source.description}}</p>
    </div>
    <div class="buttons" v-if="isStatic == false">
      <button v-if="canBuy()" id="buy" @click.prevent="handleBuy">BUY</button>
      <template v-if="canManipulate()">
        <button id="edit" @click.prevent="handleEdit">EDIT</button>
        <button id="delete" @click.prevent="handleDelete">DELETE</button>
      </template>
    </div>
  </div>
</template>

<script>
import EventBus from '../../EventBus';
export default {
  name: "Product",
  props: {
    source: Object,
    isStatic: Boolean
  },
  methods: {
    canBuy(){
      return this.$cookies.get("username") !== this.source.creator;
    },
    canManipulate() {
      return (
        this.$cookies.get("username") == this.source.creator ||
        JSON.parse(this.$cookies.get("roles")).indexOf("Admin") != -1
      );
    },

    handleBuy() {
      this.$http
        .post(
          `http://localhost:9999/feed/product/buy/${this.source._id}`,
          { username: this.$cookies.get("username") },
          {
            headers: {
              "Content-Type": "application/json",
              token: this.$cookies.get("token")
            }
          }
        )
        .then(res => {
          if (!res.data.success) {
            this.$vToastify.error({ title: " ", body: res.data.message });
          } else {
            this.$vToastify.success({ title: " ", body: res.data.message });
            EventBus.$emit('removeById',this.source._id);
          }
        })
    },
    handleEdit() {
      this.$router.push({path:`/edit/${this.source._id}`, query:this.source});
    },
    handleDelete() {
      this.$http
        .post(
          `http://localhost:9999/feed/product/remove/${this.source._id}`,
          { username: this.$cookies.get("username") },
          {
            headers: {
              "Content-Type": "application/json",
              token: this.$cookies.get("token")
            }
          }
        )
        .then(res => {
          if (!res.data.success) {
            this.$vToastify.error({ title: " ", body: res.data.message });
          } else {
            this.$vToastify.success({ title: " ", body: res.data.message });
            EventBus.$emit('removeById',this.source._id);
          }
        });
    }
  }
};
</script>

<style>
.productContainer {
  height: fit-content;

  border-radius: 5px;
  padding: 2rem;
  background: #100c1c;
}

.productContainer .title {
  display: flex;
  justify-content: space-between;
}

.productContainer .description {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.productContainer .title p {
  text-align: center;
  font-weight: bold;
  font-size: 1.3em;
  width: 33.3%;
}

.productContainer .image {
  width: 100%;
}

.productContainer .image {
  border-radius: 6px;
  width: 100%;

  grid-row-end: span 1;
  grid-column-end: span 1;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  height: 15rem;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.buttons button {
  margin: 0.3rem;
  padding: 1rem 1rem;
  font-weight: bold;
  color: white;

  background: transparent !important;
  outline: none;
  border-radius: 4px;
  border-width: 3px;
  border-color: #491bef;

  width: 100%;
}

.buttons button:hover {
  background: #491bef !important;
  border-color: transparent;
  cursor: pointer;
}

.buttons #buy {
  background: rgba(22, 124, 47, 0.918);
}

.buttons #edit {
  background: rgba(14, 22, 90, 0.753);
}

.buttons #delete {
  background: rgb(163, 0, 0);
}

.creator {
  text-align: center;
  font-weight: bold;
  font-size: 1.3em;
  color: rgb(128, 128, 128);
}
</style>