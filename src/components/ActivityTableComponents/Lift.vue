<template>
<div class="space">
    <div class="scroll">
      <div v-for="lift in lifts" :key="lift.id">
        <lift v-if="lift.date == String(date)" :id = "lift.id"/>
      </div>
    </div>

    <div class="add">
        <p> Upload a video: </p>
        <Files @image = "onUpload"></Files>
        <input placeholder="Description" v-model="newDescription" /><br>
        <input placeholder="Weight" v-model="newWeight" /><br>
        <input placeholder="Sets" v-model="newSets" /><br>
        <button @click="addEntry" > Add Activity </button>
    </div>
</div>
</template>

<script>
import { db } from "../../firebaseConfig.js"
import lift from "../IndividualActivities/LiftActivity.vue"
import Files from "../../views/Files.vue"

export default {
    components: {lift, Files},
    name: "Lift",
    props: ["email", "date"],
    data: function() {
        return {
            lifts: [],
            newDescription: "",
            newWeight: "",
            newSets: "",
            image: ""
        }
    },

    firestore: function () {
        return {
            lifts: db.collection("lift").where("email", "==", this.email)
        }
    },

    methods: {
        addEntry: function() {
            const newLiftRecord = {activity: "lift", disc: this.newDescription, weight: this.newWeight, sets: this.newSets, email: this.email, image: this.image, date: String(this.date)};
            db.collection("lift").add(newLiftRecord);
            this.newDescription = '';
            this.newWeight = '';
            this.newSets = '';
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
