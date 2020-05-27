<template>
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="Username">
            <a-input
                    v-decorator="['username', { rules: [{ required: true, message: 'Please input your username!' }] }]"
            />
        </a-form-item>
        <a-form-item label="Password">
            <a-input
                    v-decorator="['password', { rules: [{ required: true, message: 'Please input your password!' }] }]"
            />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" html-type="submit">
                Submit
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
    export default {
        data() {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this, {name: 'coordinated'}),
            };
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.$axios.post("/userLogin", {
                            "username": values.username,
                            "password": values.password
                        }).then(res => {
                            if (res.data.code === 200) {
                                this.$router.push("/employee/list");
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                    }
                });
            }
        },
    };
</script>