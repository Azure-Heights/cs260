<template>
    <div>
        <div id='banner'>
            Star Wars Encyclopedia
        </div>

        <div id='stars'></div>
        <div id='stars2'></div>

        <div id="app">
            <nav>
                <router-link to="/people/0">People</router-link> | 
                <router-link to="/planets/0">Planets</router-link> | 
                <router-link to="/films/0">Films</router-link> | 
                <router-link to="/species/0">Species</router-link> | 
                <router-link to="/vehicles/3">Vehicles</router-link> | 
                <router-link to="/starships/1">Starships</router-link>
            </nav>

            <router-view/>
        </div>

        <div class='footer'>
            <a href='https://github.com/Azure-Heights/cs260/tree/main/cp3'>See this page on GitHub!</a>
        </div>
    </div>
</template>

<style>
@import '/public/stars.css';

* {
    margin: 0;
    padding: 0;
}

html {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    overflow: hidden;
}

body {
    background-color: rgba(0,0,0,0);
}

#banner {
    font-size: 2em;
    width: 100%;
    color: #FFF;
    text-align: center;
    padding: 0.5em 0 0.5em 10px;
    background-color: rgba(43,43,43,0.33);
}

#app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-family: "lato", sans-serif;
    font-weight: 300;
    font-size: 23px;
    letter-spacing: 1px;
    color: grey;
}

.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 0.5em 0 0.5em 10px;
    background-color: rgba(43,43,43,0.33);
    font-size: 1.2em;
}

.page {
    display: flex;
    justify-content: center;
    width: 80vw;
    height: 75vh;
}

.menu {
    width: 30%;
    text-align: left;
}

.data {
    width: 40%;
    text-align: left;
}

::-webkit-scrollbar {
    display: none;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>
