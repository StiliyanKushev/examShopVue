<template>
    <div class="form sell">
                <form>
                    <div class="container">
                        <label for="title">
                            Title
                        </label>
                        <input  type="text" name="title" placeholder="Enter Product Title" />
                        <label for="imageUrl">
                            Image URL
                        </label>
                        <input  type="text" name="imageUrl" placeholder="Enter the url of your product" />
                        <label for="description">
                            Description
                        </label>
                        <textarea  rows="3" id="description" name="description"></textarea>
                        <label for="price">
                            Price
                        </label>
                        <input  type="number" name="price" placeholder="Enter product price" />
                        <button type="submit" class="SubmitButton">Sell</button>
                    </div>
                </form>
            </div>
</template>

<script>
export default {
    name: "Sell",
}
</script>