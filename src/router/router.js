import VueRouter from "vue-router";
import list from "@/components/employee/list";
import index from "@/components/index";

export const router = new VueRouter({
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
        }
    ]
})
export default router;