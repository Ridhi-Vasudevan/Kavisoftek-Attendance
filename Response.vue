<template>
    <div class="main-bg">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 d-flex justify-content-start">
                        <img :src="vectorImage" class="img-fluid img-responsive vector-img">
                </div>
                <div class="col-sm-6 land-left float-right">
                    <div class="col-sm-7">
                        <img :src="companyLogo" class="img-fluid img-responsive">
                    </div>
                    <div class="com-tagline">Your Attendance has been Successfully Submitted..</div>
                    <div class="land-btns">
                        <a href="/attendance-form">
                            <button class="atnd-btn">Back to Attendance</button>
                        </a>
                       <a href="/">
                        <button class="admin-btn">Back to Home</button>
                       </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ResponsePage',
    data() {
        return {
            companyLogo: './assets/kavisoftek.png',
            vectorImage: './assets/response.png',
        }
    }
}
</script>

<style scoped>
.main-bg {
    background: linear-gradient(45deg, white, #ffffff, #ffffff, #ffffff, #bde2ff, #0066b3);
    box-sizing: border-box;
    padding: 4.9%;
}

.com-tagline {
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -1px;
    margin-left: 5px;
    margin-top: 30px;
    color: #012970;
   
}

.land-btns button{
    padding: 10px 15px;
    margin-right: 20px;
    margin-top: 12%;
    margin-left: 5px;
    border-radius: 6px;
    border: 0.5px solid #a8a7a7;
    font-size: 18px;
    margin-bottom: 11%;
}
.land-btns button:hover{
   box-shadow: 0px 0px 10px rgb(187, 182, 182)}

.atnd-btn {
    background-color: white;
    color: black;
}
.admin-btn{
    background-color: #0066b3;
    color: white;
}

.vector-img {
    height: 790px;
    object-fit: cover;
    margin-top: -4%;
}

.land-left {
    margin-top: 14%;
}
</style>