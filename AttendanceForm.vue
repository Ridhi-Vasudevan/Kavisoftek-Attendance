<template>
    <div class="container">
        <div class="card atd-card">
            <div class="row">
                <div class="col-sm-6 atd-left-col">
                    <div class="d-flex justify-content-center">
                        <div class="camera-box">

                            <div class="d-flex justify-content-center">
                                <img style="height: 25px;" v-if="isCameraOpen"
                                    src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
                                    class="button-img camera-shoot" @click="capture" />
                                <div class="camera-button">
                                    <button type="button" class="button is-rounded cam-button"
                                        style="margin-left: 40%; border: 0px;" @click="toggleCamera">
                                        <span v-if="!isCameraOpen"><img style="height: 25px;" class="button-img"
                                                src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png" /></span>
                                        <span v-else><img style="height: 25px;" class="button-img"
                                                src="https://img.icons8.com/material-outlined/50/000000/cancel.png" /></span>
                                    </button>
                                </div>
                            </div>

                            <div style="height: 10px">
                                <div v-if="isCameraOpen" class="camera-canvas">
                                    <video ref="camera" :width="canvasWidth" :height="canvasHeight" autoplay></video>
                                    <canvas v-show="false" id="photoTaken" ref="canvas" :width="canvasWidth"
                                        :height="canvasHeight"></canvas>
                                </div>
                            </div>
                            <vue-picture-swipe :items="items"></vue-picture-swipe>

                        </div>
                    </div>
                </div>
                <div class="col-sm-6 atd-right-col">
                    <div class="col-sm-7">
                        <img :src="companyLogo" class="img-fluid img-responsive company-logo">
                    </div>
                    <div class="col-sm-7">
                        <h5 style="text-align: left; margin-left: 10px;">User Attendance Status</h5>
                    </div>
                    <br>
                    <form @submit.prevent="submitForm">

                        <div class="col-sm-8 atd-form">
                            <div class="select-dropdown" style="text-align: left; margin-left: 10px;">
                                <select v-model="employeeId" required>


                                    <option value="" disabled selected>Employee ID</option>
                                    <option value="2232">Employee ID</option>


                                    <option v-for="option in employeeOptions" :key="option.value" :value="option.value">
                                        {{ option.name }}
                                    </option>
                                </select>
                            </div>
                            <br>
                            <button type="submit" class="submit-btn" style="margin-left: 10px;">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div v-if="submitted">
            <p style="text-align: center;margin-top: 25px">Submitted!</p>
        </div>
        <div v-if="showErrorMessage" style="color: red; text-align: center;">
            Please take a picture before submitting.
        </div>
    </div>
</template>
  
<script>
import VuePictureSwipe from 'vue-picture-swipe';
import axios from 'axios';
// import { apiUrl } from 'Z:/Kavisoftek-admin/admin-panel/config.js';


export default {
    name: 'AttendancePage',
    components: {
        VuePictureSwipe,
    },
    data() {
        return {
            camImage: './assets/cam-image.png',
            companyLogo: './assets/kavisoftek.png',
            isCameraOpen: false,
            canvasHeight: 300,
            canvasWidth: 290,
            employeeId: '',
            attendanceStatus: 'in',
            submitted: false,
            isChecked: false,
            showErrorMessage: false,
            isBefore11AM: false,
            // apiUrl: VUE_APP_API_URL,
            items: [],
            employeeOptions: [],
        };
    },
    created() {
        this.fetchEmployeeOptions();
    },


    methods: {
        async fetchEmployeeOptions() {
            try {
                const response = await axios.get('http://192.168.1.5/attendancenew/public/api/suggestionforattendance');
                this.employeeOptions = response.data;
            } catch (error) {
                console.error('Error fetching employee options:', error);
            }
        },
        async submitForm() {
            try {
                if (this.employeeId && this.items.length > 0) {
                    const currentTime = new Date();
                    const checkTime = new Date(currentTime);
                    checkTime.setHours(11, 0, 0, 0);

                    this.isBefore11AM = currentTime < checkTime;

                    if (this.isBefore11AM) {
                        console.log('Current time is before 11 AM.');
                    } else {
                        console.log('Current time is at or after 11 AM.');
                    }

                    if (this.items.length > 0) {
                        const dataURL = this.items[0].src;
                        //this.isBefore11AM to uploadPhoto function
                        this.uploadPhoto(dataURL, this.isBefore11AM);
                    }

                    this.submitted = true;
                    console.log('Form Submitted!');

                    this.$router.push('/response');
                } else {
                    this.showErrorMessage = true;
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },


        toggleCamera() {
            if (this.isCameraOpen) {
                this.isCameraOpen = false;
                this.stopCameraStream();
            } else {
                this.isCameraOpen = true;
                this.startCameraStream();
            }
        },
        startCameraStream() {
            const constraints = (window.constraints = {
                audio: false,
                video: true,
            });
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then((stream) => {
                    this.$refs.camera.srcObject = stream;
                })
                .catch((error) => {
                    alert("Browser doesn't support or there is some errors." + error);
                });
        },
        stopCameraStream() {
            let tracks = this.$refs.camera.srcObject.getTracks();
            tracks.forEach((track) => {
                track.stop();
            });
        },
        capture() {
            const FLASH_TIMEOUT = 50;
            let self = this;
            setTimeout(() => {
                const context = self.$refs.canvas.getContext('2d');
                context.drawImage(self.$refs.camera, 0, 0, self.canvasWidth, self.canvasHeight);
                const dataUrl = self.$refs.canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
                self.addToPhotoGallery(dataUrl);
                // self.uploadPhoto(dataUrl);
                self.isCameraOpen = false;
                self.stopCameraStream();
            }, FLASH_TIMEOUT);
        },
        addToPhotoGallery(dataURI) {
            this.items.push({
                src: dataURI,
                thumbnail: dataURI,
                w: this.canvasWidth,
                h: this.canvasHeight,
                alt: 'some numbers on a grey background',
            });
        },
        uploadPhoto(dataURL, isBefore11AM) {
            let uniquePictureName = this.generateCapturePhotoName();
            let capturedPhotoFile = this.dataURLtoFile(dataURL, uniquePictureName + '.jpg');
            let formData = new FormData();
            formData.append('file', capturedPhotoFile);
            console.log(dataURL);
            let employeeid = this.employeeId;

            // Include isBefore11AM in the API request
            
            axios.post('http://192.168.1.5/attendancenew/public/api/attendance-store', {
                employeeid: employeeid,
                image: dataURL,
                isBefore11AM: isBefore11AM,
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error('Error uploading photo:', error);
                });
        },

        generateCapturePhotoName() {
            return Math.random().toString(36).substring(2, 15);
        },
        dataURLtoFile(dataURL, filename) {
            let arr = dataURL.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        },
    },
};
</script>
  
<style scoped>
.cam-img {
    padding: 40px;
}

.atd-left-col {
    background-image: linear-gradient(to bottom, #0066b3, #02298a, #021b79);
    border-radius: 5px 0px 0px 5px;
}

.atd-form {
    float: left;
    text-align: left;
}

.atd-form select {
    padding: 10px;
    width: 100%;
    border-radius: 20px;
    border: 0.5px solid rgb(207, 200, 200);
    color: black;
}

.submit-btn {
    width: 97%;
    border-radius: 22px;
    padding: 8px;
    background-color: #0066b3;
    border: 0.5px solid transparent;
    color: white;
}

.atd-right-col {
    padding: 140px 60px;
}

.camera-box {
    margin-top: 15%;
}

.atd-card {
    margin-top: 9%;
}

.atd-form select option {
    background-color: rgb(255, 255, 255);
    text-transform: uppercase;
    margin-top: 5px;
    padding: 10px !important;
    font-weight: 600;
}

.atd-form select option:hover {
    background-color: #021b79;
}
</style>
  