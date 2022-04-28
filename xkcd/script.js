Vue.component('star-rating', VueStarRating.default);

let app = new Vue({
    el: '#app',

    data: {
        number: '',
        max: '',
        current: {
            title: '',
            img: '',
            alt: ''
        },
        loading: true,
        addedName: '',
        addedComment: '',
        rating: 0,
        currentRatings: { },
        ratings: { },
        comments: { },
    },

    computed: {
        isFirstComic() {
            return this.number == 1;
        },

        isLastComic() {
            return this.number == this.max;
        },

        month() {
            return this.convertMonth(this.current.month);
        },
    },

    watch: {
        number(value, oldvalue) {
            if (oldvalue === '') {
                this.max = value;
            } else {
                this.xkcd();
            }

            this.rating = this.getAverage(this.ratings[value]);
        },
    },

    created() {
        this.xkcd();
    },

    methods: {
        async xkcd() {
            try {
                this.loading = true;

                let url = 'https://xkcd.now.sh/?comic='
                    + (this.number === '' ? 'latest' : this.number);

                const response = await axios.get(url);
                this.number = response.data.num;
                this.current = response.data;

                this.loading = false;
            } catch (error) {
                this.number = this.max;
            }
        },

        previousComic() {
            this.number = this.current.num - 1;
            if (this.number < 1)
                this.number = 1;
            this.rating = 0;
        },

        nextComic() {
            this.number = this.current.num + 1;
            if (this.number > this.max)
                this.number = this.max
            this.rating = 0;
        },

        getRandom(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        convertMonth(mon) {
            var month = new Array;
            if (mon === undefined)
                return '';
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            return month[mon - 1];
        },

        getAverage(obj) {
            var total = 0;
            var count = 0;
            for (idx in obj) {
                total += parseFloat(obj[idx]);
                count += 1;
            }

            const average = total / count;
            return isNaN(average) ? 0 : average;
        },

        randomComic() {
            this.number = this.getRandom(1, this.max);
        },

        firstComic() {
            this.number = 1;
        },

        latestComic() {
            this.number = this.max;
        },

        setRating(rating) {
            if (!(this.number in this.ratings))
                Vue.set(app.ratings, this.number, new Array);

            this.currentRatings = this.ratings[this.number];
            this.currentRatings.push(rating);

            this.rating = this.getAverage(this.currentRatings);
        },

        addComment() {
            if (!(this.number in this.comments))
                Vue.set(app.comments, this.number, new Array);

            const today = new Date();

            this.comments[this.number].push({
                author: this.addedName,
                text: this.addedComment,
                date: `${today.getDate()} ${this.convertMonth(today.getMonth() + 1)} ${today.getFullYear()}`
            });

            this.addedName = '';
            this.addedComment = '';
        },
    }
});
