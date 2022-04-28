<template>
    <div class='message' v-if='cartEmpty'>
        Your cart is currently empty.
    </div>
    <div v-else>
        <CartDisplay :products="products" :cart="cart" />
    </div>
</template>

<script>
import CartDisplay from "../components/CartDisplay.vue"
export default {
    name: "CartView",
    components: {
        CartDisplay
    },
    computed: {
        cart: function () {
            return this.$root.$data.cart;
        },
        products: function () {
            return this.$root.$data.products;
        },
        cartEmpty: function () {
            return this.$root.$data.cart.length <= 0;
        }
    }
}
</script>

<style scoped>
.message {
    font-size: 2em;
}
</style>
