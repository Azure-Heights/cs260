<template>
    <div id="app">
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/abilities">Abilities</router-link> |
            <router-link to="/moves">Moves</router-link> |
            <router-link to="/species">Species</router-link>
        </nav>
        <router-view/>
    </div>
</template>

<style>
html {
    color: #d8dee9;
    background-color: #2e3440;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

a {
    color: inherit;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #d8dee9;
}

nav a.router-link-exact-active {
    color: #5e81ac;
}
</style>
