import VueRouter from "vue-router";
import list from "../components/employee/list";
import modify from "../components/employee/modify";
import index from "../components/index";

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            name: "登陆页",
            path: "/",
            component: index,
            meta: {
                keepAlive: false
            }
        },
        {
            name: "员工列表页",
            path: "/employee/list",
            component: list,
            meta: {
                keepAlive: true
            }
        },
        {
            name: "员工修改页",
            path: "/employee/modify/:employeeId",
            component: modify,
            meta: {
                keepAlive: false
            }
        }
    ]
})
export default router;