<template>
  <div class="tables">
    <NavBar></NavBar>
    <h1 style = "font-family:Abel;font-size:50px">Fitness AIO</h1>
    <h2>Meals</h2>
    <div>
      <input type="date" id="date" v-model="date">
    </div><br>
    <table>
      <tr style="border-right:0px">
        <th>Breakfast</th>
        <th>Lunch</th>
        <th style="border-right:0px">Dinner</th>
      </tr>
      <tr style="border-right:0px">
        <td><Breakfast :email="this.user.email" :date="this.date"></Breakfast></td>
        <td><Lunch :email="this.user.email" :date="this.date"></Lunch></td>
        <td style="border-right:0px!important"><Dinner :email="this.user.email" :date="this.date"></Dinner></td>
      </tr>
    </table>
    <br><br><br>
    <h2>Activities</h2>
    <table>
      <tr>
        <th>Bike</th>
        <th>Run</th>
        <th style="border-right:0px">Lift</th>
      </tr>
      <tr>
        <td><Bike :email="this.user.email" :date="this.date"></Bike></td>
        <td><Run :email="this.user.email" :date="this.date"></Run></td>
        <td style="border-right:0px"><Lift :email="this.user.email" :date="this.date"></Lift></td>
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import Breakfast from '../components/MealTableComponents/Breakfast.vue'
import Lunch from '../components/MealTableComponents/Lunch.vue'
import Dinner from '../components/MealTableComponents/Dinner.vue'
import Bike from '../components/ActivityTableComponents/Bike.vue'
import Run from '../components/ActivityTableComponents/Run.vue'
import Lift from '../components/ActivityTableComponents/Lift.vue'

import { auth } from "@/firebaseConfig";

export default {
  name: 'Tables',
  components: {
    NavBar,
    Breakfast,
    Lunch,
    Dinner,
    Bike,
    Run,
    Lift
  },

  data: function () {
    return {
      user: null,
      date: null
    };
  },

  beforeCreate: function() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });
  },

  updated: function() {
    if (document.getElementById('date').valueAsDate == null) {
      document.getElementById('date').valueAsDate = new Date();
    }
  }
}

</script>

<style scoped>
table, td, th {
    border-radius: 5px;
    border-collapse: collapse;
    background-color: #f7f7f7;
    padding: 5px;
}
td, th {
  width: 100%;
  height: 25px;
  border-right: 1px #949494 solid;
}
th{
	font-size: 20px;
}
table {
  width: 80%;
  table-layout:fixed;
  margin: auto;
}
.clickable {
  cursor: pointer;
  color:red;
}

.date {
  margin: right;
}
</style>
