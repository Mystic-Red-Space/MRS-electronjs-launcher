<template>
    <div v-on:load="EnsureValidate">
    </div>
</template>

<script>
    const storage = require("../../js/storage");
    const mclogin = require("../../js/auth");
    export default {
        name: "load",
        methods: {
            EnsureValidate: function (event) {
                const localStorage = storage.tryGetLocalStorage();
                if (!localStorage) {
                    this.$router.push('login');
                    return;
                }
                mclogin.validate(localStorage.accessToken)
                    .then((res) => {
                        if (res.status === 204) {
                            storage.clonLocaltoSession();
                            this.$router.push('launcher');
                        }
                    })
                    .catch((err) => {
                        storage.removeLocalStorage();
                        this.$router.push('login');
                    });
            }
        },
        beforeMount() {
            this.EnsureValidate();
        }
    }
</script>

<style scoped>

</style>