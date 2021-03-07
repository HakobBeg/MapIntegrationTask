<template>
    <div class="content">
        <GoogleMap class="map"
                   api-key="AIzaSyATIRsuCpEp72Iw9EnKv2ZojVozWInBS4s"
                   style="width: 98%; height: 100%;margin-left: 1%;margin-right: 1%"
                   :center="this.$data.center"
                   :zoom="15"
                   v-on:click="mark"
        >

            <Marker v-on:dblclick="deleteMark(mark.id)" v-on:click="select(mark.id)" v-bind:key="mark" v-for="mark in this.$store.getters.getMarks"
                    :options="{position: mark.position, label: (mark.name)?mark.name[0]:'', title: mark.name}"/>
        </GoogleMap>
    </div>
</template>

<script>
    import {defineComponent} from 'vue'
    import {GoogleMap, Marker} from 'vue3-google-map'
    import {store} from "../main";


    export default defineComponent({
        components: {GoogleMap, Marker},
        store: store,
        data() {

            return {
                center: {
                    lat: 40.177200, lng: 44.503490
                },
            };
        },
        mounted() {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.center.lat = position.coords.latitude;
                    this.center.lng = position.coords.longitude;
                },
                error => {
                    console.log(error.message);
                },
            )
        },
        methods: {

            makeId: function () {
                return '_' + Math.random().toString(36).substr(2, 9);
            },
            mark: function (event) {

                const latitude = event.latLng.lat()
                const longitude = event.latLng.lng()
                const position = {lat: latitude, lng: longitude};
                this.$store.commit('addMark', {id: this.makeId(), position: position});
            },
            select: function (id) {
                    this.$store.commit('selectMark',id);
            },

            deleteMark: function (id) {
                    this.$store.commit('deleteMarkById',id);
            }

        }
    })
</script>


<style>
    .map {
        border-radius: 20px;

    }

    .content {
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
    }

</style>
