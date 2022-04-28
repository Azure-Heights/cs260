<template>
    <div class='products'>
        <div class='product' v-for="product in cart" :key="product.id">
            <div class='info'>
                {{products[product.id].name}}
            </div>
            <div class='price'>
                <h2>{{products[product.id].price}}</h2>
                <button class="auto" v-on:click="removeFromCart(product.id, cart)">Remove</button>
                <div class='quantities'>
                    <button class="auto" v-on:click="addQuantity(product.id, cart)">+</button>
                    {{product.count}}
                    <button class="auto" v-on:click="subtractQuantity(product.id, cart)">-</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CartDisplay",
    props: {
        cart: Array,
        products: Array
    },
    methods: {
        removeFromCart(id, cart) {
            let index = undefined;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].id == id) {
                    index = i;
                }
            }

            cart.splice(index, 1);
        },
        addQuantity(id, cart) {
            for (let product of cart) {
                if (product.id == id) {
                    product.count += 1;
                }
            }
        },
        subtractQuantity(id, cart) {
            for (let product of cart) {
                if (product.id == id) {
                    product.count -= 1;

                    if (product.count <= 0) {
                        this.removeFromCart(id, cart);
                    }
                }
            }
        },
    },
}
</script>

<style scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.products {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.product {
    margin: 10px;
    margin-top: 50px;
    width: 200px;
}

.product img {
    border: 2px solid #333;
    height: 250px;
    width: 200px;
    object-fit: cover;
}

.product .image {
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
}

.info {
    background: #F2921D;
    color: #000;
    padding: 10px 30px;
}

.info h1 {
    font-size: 16px;
}

.info h2 {
    height: 50px;
    font-size: 14px;
}

.info p {
    margin: 0px;
    font-size: 10px;
}

.price {
    display: flex;
    justify-content: space-around;
}

button {
    height: 50px;
    background: #000;
    color: white;
    border: none;
}

.quantities {
    height: 50px;
    background: #000;
    color: white;
}

.quantities button {
    width: 20px;
}

.auto {
    margin-left: auto;
}
</style>
