<template>
    <div class="card" v-if="lift">
      <b>Description: </b>
      <div style="display:inline-block">
          <span v-if="!editable" @click="editable=true" >{{lift.disc}}</span>
          <div v-else>
              <input v-model="newText" />
              <button @click="hide"> done editing </button>
          </div>
      </div><br>
      <b>Weight:</b> {{lift.weight}} <br>
      <b>Sets:</b> {{lift.sets}} <br><br>
      <video :src="lift.image" style = "width: 8em; height: 7em" onclick = "this.play();" v-if="lift.image"> </video>
      <br>
      <span class="clickable" @click="doDelete"><b>Delete</b></span> &nbsp;
    </div>
</template>
<script>
// for more information about what's possible with firestore's API: https://firebase.google.com/docs/firestore/quickstart
// and https://vuefire.vuejs.org/vuefire/#why

import {db} from "../../firebaseConfig.js"

export default {
    name: "LiftA",
    props: ["id"],
    data: function() {
        return {
            lift: null,
            disc: this.disc,
            weight: this.weight,
            sets: this.sets,
            editable: false,
            newText: "",
            image: this.image,
        };
    },
    firestore: function() {
        return {
          lift: db.collection("lift").doc(this.id)
        }
    },
    methods: {
        doDelete: function() {
            this.$firestoreRefs.lift.delete()
        },
        hide: function() {
            this.editable = false;
            this.lift.disc = this.newText;
            this.$emit("changed", this.text);
            this.$firestoreRefs.lift.set(this.lift)
        }
    }
}
</script>

<style scoped>
.clickable {
    cursor: pointer;
    color:red;
	transition:color .5s;
}
.clickable:hover {
    color:darkred;
}
.card {
	padding: 5px;
    background-color: #efefef;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 2px;
    border-bottom-left-radius: 2px;
    margin-bottom: 5px;
}
</style>
