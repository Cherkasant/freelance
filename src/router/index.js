import {createRouter, createWebHistory} from 'vue-router'
import AllTasks from "@/views/AllTasks";
import SingleTask from "@/views/SingleTask";
import NewTask from '@/views/NewTask'
import NotFound from "@/views/NotFound";

const routes = [{
    path: '/', name: 'home', component: AllTasks
}, {
    path: '/task/:id', name: 'about', component: SingleTask, props: true
}, {path: '/new', component: NewTask},
    {path: "/:notFound(.*)", component: NotFound},
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
})

export default router
