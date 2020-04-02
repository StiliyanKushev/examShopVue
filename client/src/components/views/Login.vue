<template>
    <div class="form">
                <form>
                    <div class="container">
                        <label for="email">
                            Email
                        </label>
                        <input type="text" name="email" placeholder="Enter Email" />
                        <label for="password">
                            Password
                        </label>
                        <input type="password" name="password" placeholder="Enter Password" />
                        <button type="submit" class="SubmitButton">Login</button>
                    </div>
                    <div class="otherOption">
                        <p>Don't have an account? <router-link to="/register">Register.</router-link></p>
                    </div>
                </form>
            </div>
</template>

<script>
export default {
    name: 'LoginView',
}
</script>