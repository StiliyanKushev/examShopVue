<template>
    <div class="form register">
                <form>
                    <div class="container">
                        <label for="username">
                            Username
                    </label>
                        <input  type="text" name="username" placeholder="Enter Username" />
                        <label for="email">
                            Email
                    </label>
                        <input  type="text" name="email" placeholder="Enter Email" />
                        <label for="password">
                            Password
                    </label>
                        <input  type="password" name="password" placeholder="Enter Password" />
                        <button type="submit" class="SubmitButton">Register</button>
                    </div>
                    <div class="otherOption">
                        <p>Have an account? <router-link to="/login">Login.</router-link></p>
                    </div>
                </form>
            </div>
</template>

<script>
export default {
    name: 'RegisterView',
}
</script>