<template>
    <div v-if='!(photo == undefined)' class='wrapper'>
        <img :src='photo.path'/>
        <div class="photoInfo">
            <p><span class='photoTitle'>{{photo.title}}</span> by <span class='photoPublisher'>{{photo.user.firstName}} {{photo.user.lastName}}</span></p>
            <p class="photoDate">Uploaded {{formatDate(photo.created)}}.</p>
            <p class='photoDesc'>{{photo.description}}</p>
        </div>

        <template v-if='user'>
            <h3>Add a Comment</h3>
            <form v-on:submit.prevent="addComment">
                <textarea v-model="commentText"></textarea>
                <br/>
                <button type="submit">Comment</button>
            </form>
        </template>

        <h3>Comments</h3>
        <div class='comments'>
            <div v-for='comment in comments' :key='comment._id' class='comment'>
              <hr>
              <p>{{comment.text}}</p>
              <p><i>-- {{comment.user.firstName}} {{comment.user.lastName}} ({{formatDate(comment.created)}})</i></p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
    name: "PhotoPage",
    data() {
        return {
            photo: undefined,
            comments: [],
            commentText: "",
        }
    },
    computed: {
        user() {
            return this.$root.$data.user;
        }
    },
    created() {
        this.getPhoto();
        this.getComments();
    },
    methods: {
        async getPhoto() {
            try {
                this.response = await axios.get(`/api/photos/single/${this.$route.params.id}`);
                this.photo = this.response.data;
            } catch (error) {
                console.log(error.response.data.message);
            }
        },
        async getComments() {
            try {
                this.response = await axios.get(`/api/comments/${this.$route.params.id}`);
                this.comments = this.response.data;
            } catch (error) {
                console.log(error.response.data.message);
            }
        },
        async addComment() {
            try {
                await axios.post(`/api/comments/${this.$route.params.id}`, { text: this.commentText });
                this.commentText = "";
            } catch (error) {
                this.error = "Error: " + error.response.data.message;
            }
            this.getComments();
        },
        formatDate(date) {
            if (moment(date).diff(Date.now(), 'days') < 15)
            return moment(date).fromNow();
            else
            return moment(date).format('d MMMM YYYY');
        }
    },
}
</script>

<style>
img {
    margin-top: 130px;
    max-height: 400px;
    border-radius: 10px;
    box-shadow: 5px 5px 15px black;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.photoInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 2em;
}

.photoInfo p {
    margin: 0px;
}

.photoTitle {
    font-weight: bold;
}

.photoPublisher {
    font-size: 0.9em;
}

.photoDesc {
    margin-top: 1em !important;
}

p {
    margin: 0px;
}

button {
    font-size: 1em;
}

textarea {
    width: 100%;
    max-width: 500px;
    height: 100px;
}

.comments {
    margin-bottom: 3em;
}
</style>
