<template>
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="employeeName">
            <a-input
                    v-decorator="['employeeName', { rules: [{ required: true, message: '请输入员工姓名' }] }]"
            />
        </a-form-item>
        <a-form-item label="employeeEmail">
            <a-input
                    v-decorator="['employeeEmail', { rules: [{ required: true, message: '请输入员工邮箱' }] }]"
            />
        </a-form-item>
        <a-form-item label="employeeGender">
            <a-radio-group
                    v-decorator="['employeeGender', { rules: [{ required: true, message: '请选择员工性别!' }] }]"
            >
                <a-radio-button :value=1>
                    男
                </a-radio-button>
                <a-radio-button :value=0>
                    女
                </a-radio-button>
            </a-radio-group>
        </a-form-item>
        <a-form-item label="employeeBirthday">
            <a-date-picker
                    v-decorator="['employeeBirthday', { rules: [{ required: true, message: '请选择员工生日!' }] }]"
            />
        </a-form-item>
        <a-form-item label="employeeDepartment">
            <a-select
                    v-decorator="['employeeDepartment', { rules: [{ required: true, message: '请选择员工所在部门!' }] }]"
            >
                <a-select-option v-for="(item,index) of departments" :key="index" :value="item.departmentId">
                    {{item.departmentName}}
                </a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" html-type="submit">
                Submit
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
    import moment from "moment";

    export default {
        data() {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this, {name: 'coordinated'}),
                departments: []
            };
        },
        mounted() {
            this.loadEmployeeInfo();
            this.loadDepartmentList();
        },
        methods: {
            loadEmployeeInfo() {
                if (this.$route.params.employeeId !== "-1")
                    this.$axios.get(`/emp/look/${this.$route.params.employeeId}`).then(res => {
                        if (res.data.code === 200) {
                            let employeeInfo = res.data.data;
                            this.form.setFieldsValue({"employeeName": employeeInfo.employeeName})
                            this.form.setFieldsValue({"employeeEmail": employeeInfo.employeeEmail})
                            this.form.setFieldsValue({"employeeGender": employeeInfo.employeeGender})
                            this.form.setFieldsValue({"employeeBirthday": moment(employeeInfo.employeeBirthday)})
                            this.form.setFieldsValue({"employeeDepartment": employeeInfo.employeeDepartment.departmentId})
                        } else {
                            this.$message.error(res.data.msg);
                            this.$router.push({path: "/"})
                        }
                    });
            },
            loadDepartmentList() {
                this.$axios.get("/dep/li").then(res => {
                    if (res.data.code === 200) {
                        this.departments = res.data.data;
                    } else {
                        this.$message.error(res.data.msg);
                        this.$router.push({path: "/"})
                    }
                });
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let department = {};
                        this.departments.forEach(item => {
                            if (item.departmentId === values.employeeDepartment)
                                department = {
                                    "departmentId": item.departmentId,
                                    "departmentName": item.departmentName
                                };
                        })
                        let data = {
                            "employeeName": values.employeeName,
                            "employeeEmail": values.employeeEmail,
                            "employeeBirthday": values.employeeBirthday.valueOf(),
                            "employeeDepartment": department,
                            "employeeGender": values.employeeGender
                        };
                        let url = this.$route.params.employeeId === "-1" ? "/emp/add" : "/emp/update";
                        if (this.$route.params.employeeId !== "-1") {
                            data.employeeId = this.$route.params.employeeId;
                        }
                        this.$axios.post(url, data).then(res => {
                            if (res.data.code === 200) {
                                this.$router.push("/employee/list");
                            } else {
                                this.$message.error(res.data.msg);
                                this.$router.push({path: "/"})
                            }
                        })
                    }
                });
            }
        },
    };
</script>