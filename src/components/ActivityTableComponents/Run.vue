<template>
<div class="space">
    <div class="scroll">
      <div v-for="run in runs" :key="run.id">
        <run v-if="run.date == String(date)" :id = "run.id"/>
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
import { db } from "../../firebaseConfig.js"
import run from "../IndividualActivities/RunActivity.vue"
import Files from "../../views/Files.vue"

export default {
    components: {run, Files},
    name: "Run",
    props: ["email", "date"],
    data: function() {
        return {
            runs: [],
            newDescription: "",
            newDistance: "",
            newTime: "",
            image: ""
        }
    },

    firestore: function () {
        return {
            runs: db.collection("run").where("email", "==", this.email)
        }
    },

    methods: {
        addEntry: function() {
            const newRunRecord = {activity: "run", disc: this.newDescription, distance: this.newDistance, time: this.newTime, email: this.email, image: this.image, date: String(this.date)};
            db.collection("run").add(newRunRecord);
            this.newDescription = '';
            this.newDistance = '';
            this.newTime = '';
  
        },
        onUpload: function(image) {
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
