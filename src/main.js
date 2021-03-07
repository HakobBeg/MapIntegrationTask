import {createApp} from 'vue'
import App from './App.vue'
import {createStore} from 'vuex'

const app = createApp(App);

export const store = createStore({
    state() {
        return {
            markers: (localStorage.getItem('marks'))?JSON.parse(localStorage.getItem('marks')):[],
            selectedMark: (localStorage.getItem('selectedMark'))?JSON.parse(localStorage.getItem('selectedMark')):-1,
        }
    },

    mutations: {
        addMark(state, mark) {
            state.markers.push(mark);
        },
        deleteMarkById(state,id) {
            state.markers =  state.markers.filter((mark)=>{
                return mark.id != id;
            })

        },
        selectMark(state,id){
            state.selectedMark = id;
        },
        clearMarks(state){
            state.markers = [];
        },
        saveToLocalStorage(state){
            localStorage.setItem('marks', JSON.stringify(state.markers));
            localStorage.setItem('selectedMark', JSON.stringify(state.selectedMark));
            alert('Marks Saved!');
        },
        setName(state, update){
            state.markers.find(mark=>mark.id === update.id).name = update.name;
        }
    },
    getters: {
        getMarks(state) {
            return state.markers;
        },
        getSelectedMark(state) {
            return state.selectedMark;
        }
    },


});



//     updateMarkById(state,id, mark){
//         state.markers[this.findIndex(id)] = mark;
//     },




app.use(store);
app.mount('#app');
