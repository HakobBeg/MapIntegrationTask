<template>

    <div class="content">
        <label class="titleLabel">
            Marks
        </label>
        <div class="markList">
            <div v-bind:key="mark" v-for="(mark,index) in markers">
                <div  v-bind:style="[selectedItem === mark.id ? 'background-color: red': '']"
                     class="listItem">
                    <span style="font-size: 150%;font-weight: bold">{{index+1}}</span>
                    <div v-on:click="setName(mark)" v-if="!mark.name" class="positions">
                        <span class="spaner">Latitude</span><label>{{mark.position.lat}}</label>
                        <span class="spaner">Longitude</span><label>{{mark.position.lng}}</label>
                    </div>
                    <div v-on:click="setName(mark)" class="positions" v-if="mark.name">
                        <label class="name">{{mark.name}}</label>
                    </div>
                    <svg style="z-index: 1000" v-on:click="deleteItem(mark.id)" height="40px" viewBox="-57 0 512 512" width="40px"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="m156.371094 30.90625h85.570312v14.398438h30.902344v-16.414063c.003906-15.929687-12.949219-28.890625-28.871094-28.890625h-89.632812c-15.921875 0-28.875 12.960938-28.875 28.890625v16.414063h30.90625zm0 0"/>
                        <path d="m344.210938 167.75h-290.109376c-7.949218 0-14.207031 6.78125-13.566406 14.707031l24.253906 299.90625c1.351563 16.742188 15.316407 29.636719 32.09375 29.636719h204.542969c16.777344 0 30.742188-12.894531 32.09375-29.640625l24.253907-299.902344c.644531-7.925781-5.613282-14.707031-13.5625-14.707031zm-219.863282 312.261719c-.324218.019531-.648437.03125-.96875.03125-8.101562 0-14.902344-6.308594-15.40625-14.503907l-15.199218-246.207031c-.523438-8.519531 5.957031-15.851562 14.472656-16.375 8.488281-.515625 15.851562 5.949219 16.375 14.472657l15.195312 246.207031c.527344 8.519531-5.953125 15.847656-14.46875 16.375zm90.433594-15.421875c0 8.53125-6.917969 15.449218-15.453125 15.449218s-15.453125-6.917968-15.453125-15.449218v-246.210938c0-8.535156 6.917969-15.453125 15.453125-15.453125 8.53125 0 15.453125 6.917969 15.453125 15.453125zm90.757812-245.300782-14.511718 246.207032c-.480469 8.210937-7.292969 14.542968-15.410156 14.542968-.304688 0-.613282-.007812-.921876-.023437-8.519531-.503906-15.019531-7.816406-14.515624-16.335937l14.507812-246.210938c.5-8.519531 7.789062-15.019531 16.332031-14.515625 8.519531.5 15.019531 7.816406 14.519531 16.335937zm0 0"/>
                        <path d="m397.648438 120.0625-10.148438-30.421875c-2.675781-8.019531-10.183594-13.429687-18.640625-13.429687h-339.410156c-8.453125 0-15.964844 5.410156-18.636719 13.429687l-10.148438 30.421875c-1.957031 5.867188.589844 11.851562 5.34375 14.835938 1.9375 1.214843 4.230469 1.945312 6.75 1.945312h372.796876c2.519531 0 4.816406-.730469 6.75-1.949219 4.753906-2.984375 7.300781-8.96875 5.34375-14.832031zm0 0"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="buttons">
            <button v-on:click="clearMarks">Clear Marks</button>
            <button v-on:click="saveChanges">Save Changes</button>
        </div>
    </div>
</template>

<script>
    import {defineComponent} from 'vue'
    import {mapState} from 'vuex'

    export default defineComponent({
        data() {

            return {};
        },
        computed: {
            ...mapState(
                {
                    markers: 'markers',
                    selectedItem: 'selectedMark'
                }
            )
        },
        mounted() {

        },
        created() {
            this.markers = this.$store.getters.getMarks;
            this.selectedItem = this.$store.getters.getSelectedMark;
        },
        methods: {

            deleteItem(id) {
                this.$store.commit('deleteMarkById', id);
                this.markers = this.$store.getters.getMarks;
            },

            clearMarks() {
                this.$store.commit('clearMarks');
            },
            saveChanges() {
                this.$store.commit('saveToLocalStorage');
            },
            setName(mark) {
                const name = prompt('Set Mark Name');
                if (name) {
                    this.$store.commit('setName', {id: mark.id, name: name});
                }
            }

        }
    })
</script>


<style scoped>
    .content {
        height: 98vh;
        width: 15%;
        top: 0;
        right: 0;
        background-color: rgba(177, 177, 177, 0.85);
        padding: 1vh;
        display: flex;
        flex-direction: column;
        align-items: center;

    }

    .titleLabel {
        font-family: "Roboto Light";
        font-weight: bold;
        font-size: 150%;
    }

    .markList {
        height: 82vh;
        width: 100%;
        margin-top: 3vh;
        overflow: auto;
    }

    .name {
        font-weight: bold;
        font-size: 140%;
        padding-top : 15%;
        padding-bottom : 15%;
    }

    .listItem {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        background-color: whitesmoke;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .positions {
        display: flex;
        flex-direction: column;
        align-content: space-between;
    }

    .spaner {
        font-weight: bold;
        font-size: 130%;
    }

    .buttons {
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 5vh;
    }

    .buttons button {
        height: 100%;
        width: 40%;
        border-radius: 13px;
    }
</style>
