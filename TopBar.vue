<template>
    <div class="row topbar">
        <div class="col-sm-2">
            <img :src="companyLogo" class="img-fluid img-responsive company-logo">
        </div>
        <div class="col-sm-10">
            <!-- <div class="d-flex justify-content-end">Admin</div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopBar',
    data() {
        return {
            companyLogo: './assets/kavisoftek.png',
        }
    }
}
</script>

<style scoped>
.topbar {
    background-color: white;
    padding: 10px 0px;
    box-shadow: 0px 0px 8px rgb(182, 181, 181);
}

.company-logo {
    width: 170px;
    margin-left: 20px;
}
</style>