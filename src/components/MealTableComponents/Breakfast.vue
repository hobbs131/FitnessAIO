<template>
<div class="space">
    <div class="scroll">
      <div v-for="meal in meals" :key="meal.id">
        <Meal v-if="meal.date == String(date)" :id="meal.id"/>
      </div>
    </div>
    <div class="add">
        <p> Upload an image: </p>
        <Files @image = "onUpload"></Files>
        <input placeholder="Description" v-model="newDescription" /><br>
        <input type="number" placeholder="Calories" v-model="newCalories" /><br>
        <button @click="addMeal" > Add Meal </button>
    </div>
    
</div>
</template>

<script>
import { db } from "../../firebaseConfig.js"
import Meal from "../IndividualMeals/BreakfastMeal.vue"
import Files from "../../views/Files.vue"

export default {
    components: {Meal, Files},
    name: "Breakfast",
    props: ["email", "date"],
    data: function() {
        return {
            meals: [],
            newDescription: "",
            newCalories: "",
            image: ""
        }
    },

    firestore: function () {
        return {
            meals: db.collection("breakfast").where("email", "==", this.email)
        }
    },

    methods: {
        addMeal: function() {
            const newMealRecord = {meal: "breakfast", disc: this.newDescription, calories: this.newCalories, email: this.email, image: this.image, date: String(this.date)};
            db.collection("breakfast").add(newMealRecord);
            this.newDescription = '';
            this.newCalories = '';
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
	max-height: 190px;
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
