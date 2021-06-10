<template>
<div class="space">
    <div class="scroll">
      <div v-for="bike in bikes" :key="bike.id">
        <bike v-if="bike.date == String(date)" :id = "bike.id"/>
      </div>
    </div>

    <div class="add">
      <p> Upload a video: </p>
      <Files @image = "onUpload"></Files>
      <input placeholder="Description" v-model="newDescription" /><br>
      <input placeholder="Distance" v-model="newDistance" /><br>
      <input placeholder="Time" v-model="newTime" /><br>
      <button @click="addEntry" > Add Activity </button>
    </div>
</div>
</template>

<script>
import {db} from "../../firebaseConfig.js"
import bike from "../IndividualActivities/BikeActivity.vue"
import Files from "../../views/Files.vue"

export default {
    components: {bike, Files},
    name: "Bike",
    props: ["email", "date"],
    data: function() {
        return {
            bikes: [],
            newDescription: "",
            newDistance: "",
            newTime: "",
            image: ""
        }
    },

    firestore: function () {
        return {
            bikes: db.collection("bike").where("email", "==", this.email)
        }
    },

    methods: {
        addEntry: function() {
            const newBikeRecord = {activity: "bike", disc: this.newDescription, distance: this.newDistance, time: this.newTime, email: this.email, image: this.image, date: String(this.date)};
            db.collection("bike").add(newBikeRecord);
            this.newDescription = '';
            this.newDistance  = '';
            this.newTime = '';
            this.image = '';
        },
        onUpload: function(image) {
          console.log("in Breakfast:", image);
          this.image = image;
        }
    },
}
</script>

<style scoped>
.space {
  margin: 5px;
  height: 350px;
  position: relative;
}
.scroll {
	max-height: 155px;
    width: calc(100% - 10px);
	overflow-y: auto;
}
.add {
  width: 100%;
  position: absolute;
  bottom: 0px;
}
input {
  width: 90%;
  margin: 3px;
  padding: 3px;
}
</style>
