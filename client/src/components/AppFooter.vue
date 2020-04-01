<template>
    <footer>
        <p>Copyright @Softuni exam for VueJS 2020</p>
    </footer>
</template>

<script>
export default {
    name: "AppFooter",
}
</script>

<style>
/* css for the footer */
footer {
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;

  background: #0E0A19;
  color: white;
}
footer > p {
  margin: 0%;
}
</style>