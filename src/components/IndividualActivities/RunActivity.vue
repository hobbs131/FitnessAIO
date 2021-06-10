<template>
    <div class="card" v-if="run">
      <b>Description: </b>
      <div style="display:inline-block">
          <span v-if="!editable" @click="editable=true" >{{run.disc}}</span>
          <div v-else>
              <input v-model="newText" />
              <button @click="hide"> done editing </button>
          </div>
      </div><br>
      <b>Distance:</b> {{run.distance}} <br>
      <b>Time:</b> {{run.time}} <br><br>
      <video :src="run.image" style = "width: 8em; height: 7em" onclick = "this.play();" v-if="run.image"> </video>
      <br>
      <span class="clickable" @click="doDelete"><b>Delete</b></span> &nbsp;
    </div>
</template>
<script>
// for more information about what's possible with firestore's API: https://firebase.google.com/docs/firestore/quickstart
// and https://vuefire.vuejs.org/vuefire/#why

import {db} from "../../firebaseConfig.js"

export default {
    name: "RunA",
    props: ["id"],
    data: function() {
        return {
            run: null,
            disc: this.disc,
            distance: this.distance,
            time: this.time,
            editable: false,
            newText: "",
            image: this.image,
        };
    },
    firestore: function() {
        return {
          run: db.collection("run").doc(this.id)
        }
    },
    methods: {
        doDelete: function() {
            this.$firestoreRefs.run.delete()
        },
        hide: function() {
            this.editable = false;
            this.run.disc = this.newText;
            this.$emit("changed", this.text);
            this.$firestoreRefs.run.set(this.run)
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
