<template>
    <div class="float-left sidenav">
        <div class="side-column">

            <div>
                <a href="/">
                    <i class="fa fa-chart-line"></i>
                    <span class="side-menu">&nbsp;Dashboard</span>
                </a>
            </div>
            <div>
                <a href="/employee">
                    <i class="fa fa-user"></i>
                    <span class="side-menu"> Manage Employees</span>
                </a>
            </div>
            <!-- <div>
                <a href="/report">
                    <i class="fa fa-user-plus"></i>
                    <span class="side-menu">Add Employee</span></a>
            </div>
            <div>
                <a href="/report">
                    <i class="fa fa-list-check"></i>
                    <span class="side-menu">Manage Employee</span></a>
            </div> -->
            <div>
                <a href="/">
                    <i class="fa fa-sheet-plastic"></i>
                    <span class="side-menu">&nbsp;Attendance Sheet</span>
                </a>
            </div>
            <div>
                <a href="">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    <span class="side-menu"> Logout</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideBar'
}
</script>

<style scoped>
.sidenav {
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: 4px 0px 5px rgb(204, 204, 204);
    margin: 1px;
}

.sidebar {
    position: fixed;
}

.side-column {
    background: white;
    height:100vh;
}

.side-column div a {
    font-size: 21px;
    color: #012970;
    text-decoration: none;
}

.side-column div {
    padding: 15px 0px;
    padding-left: 10px;
}

.side-column div:hover {
    background-color: #ddebf7;
}

.side-column div a:hover {
    text-decoration: none;
}

.side-menu {
    margin-left: 12px;
}

.brand-name {
    font-weight: 900;
    font-size: 32px;
    letter-spacing: 3px;
    padding-left: 12px;
}

.brand-logo {
    font-weight: 700;
    font-size: 32px;
}

.hr {
    color: white;
    margin-left: -15px;
    padding-left: -10px;
}

.brand:hover {
    background-color: transparent !important;
}
</style>