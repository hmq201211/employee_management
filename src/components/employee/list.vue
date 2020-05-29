<template>
    <div>
        <a-table :columns="columns" :data-source="data" rowKey="employeeId">
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="myTitle"><a-icon type="smile-o"/> Name</span>
            <span slot="action" slot-scope="text, record">
              <a @click="handleUpdate(record)">Update</a>
              <a-divider type="vertical"/>
              <a @click="handleDelete(record)">Delete</a>
            </span>
        </a-table>
        <a-button @click="handleUpdate({employeeId:-1})">添加员工</a-button>
    </div>
</template>
<script>
    const columns = [
        {
            title: "employeeId",
            dataIndex: 'employeeId',
        },
        {
            dataIndex: 'employeeName',
            slots: {title: 'myTitle'},
            scopedSlots: {customRender: 'name'},
        },
        {
            title: 'employeeBirthday',
            dataIndex: 'employeeBirthday',
        },
        {
            title: 'employeeEmail',
            dataIndex: 'employeeEmail',
        },
        {
            title: 'Action',
            scopedSlots: {customRender: 'action'},
        },
    ];
    export default {
        name: "list",
        data() {
            return {
                data: [],
                columns,
                departments: []
            };
        },
        activated() {
            this.loadEmployeeList();
        },
        methods: {
            loadEmployeeList() {
                this.$axios.get("/emp/li").then(res => {
                    if (res.data.code === 200) {
                        this.data = res.data.data;
                    } else {
                        this.$message.error(res.data.msg);
                        this.$router.push("/");
                    }
                })
            },
            handleUpdate(record) {
                this.$router.push({path: `/employee/modify/${record.employeeId}`});
            },
            handleDelete(record) {
                let data = new FormData();
                data.append("employeeId", record.employeeId);
                this.$axios.post("/emp/del", data).then(res => {
                    if (res.data.code === 200) {
                        this.loadEmployeeList();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            }
        }
    };
</script>
