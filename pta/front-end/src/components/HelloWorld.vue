<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>
            PTA is a tabletop RPG system based on the Pokemon manga and anime franchize.
            <br>
            This site servers as a stats brower for the Pokemon species, as well as the
            <br>
            abilities they can develop and moves they can learn.
        </p>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    }
}
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
