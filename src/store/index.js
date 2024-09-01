import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        tasks: [],
        singleTask: {},
        newTask: {},
        isBefore: false
    },
    getters: {
        getTasks: (state) => state.tasks,
        getSingleTask: (state) => state.singleTask
    },
    mutations: {
        SET_TASKS(state, tasks) {
            state.tasks = tasks
        },
        SET_SINGLE_TASK(state, singleTask) {
            state.singleTask = singleTask
        },
        POST_NEW_TASK(state, newTask) {
            state.newTask = newTask
        },
        PATCH_TASK() {

        },
        IS_BEFORE_DATE(state, isBefore) {
            state.isBefore = isBefore
        }
    },
    actions: {
        async fetchTasks({commit}) {
            try {
                const {data} = await axios.get('https://http-8c495-default-rtdb.firebaseio.com/tasks.json')

                const response = Object.keys(data).map(key => {
                    return {
                        id: key,
                        ...data[key]
                    }
                })
                commit('SET_TASKS', response)

            } catch (e) {
                console.log(e.message)
            }
        },
        async fetchSingleTask({commit}, id) {
            try {
                const {data} = await axios.get(`https://http-8c495-default-rtdb.firebaseio.com/tasks/${id}.json`)
                commit('SET_SINGLE_TASK', data)
            } catch (e) {
                console.log(e.message)
            }
        },
        async saveTask({commit}, task) {
            try {
                const {data} = await axios.post('https://http-8c495-default-rtdb.firebaseio.com/tasks.json',
                    {
                        ...task
                    }
                )
                commit('POST_NEW_TASK', data)
            } catch (e) {
                console.log(e.message)
            }
        },
        async updateTask({commit}, {id, status}) {
            try {
                const {data} = await axios.patch(`https://http-8c495-default-rtdb.firebaseio.com/tasks/${id}.json`,
                    {status}
                )
                if (data) {
                    try {
                        const {data} = await axios.get(`https://http-8c495-default-rtdb.firebaseio.com/tasks/${id}.json`)
                        commit('SET_SINGLE_TASK', data)
                    } catch (e) {
                        console.log(e)
                    }
                }

            } catch (e) {
                console.log(e.message)
            }
        },
        isBefore({commit}, data) {
            commit('IS_BEFORE_DATE', data)
        }
    },
    modules: {}
})
