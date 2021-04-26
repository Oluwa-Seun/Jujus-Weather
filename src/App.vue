<template>
  <div class="main">
   <Navigation />
<router-view v-bind:cities="cities"/>
  </div>
</template>
<script>
import axios from "axios";
import db from "./firebase/firebaseinit";
import Navigation from "./components/Navigation";
export default {
  name: "App",
  components: {
    Navigation 
  },
  data(){
    return{
      APIkey: "26c12ef43a0779c493a4a8fdcb5ab85b",
      cities:[],
      
    };
  },
  created() {
    this.getCityWeather();
  },
  methods: {
    getCityWeather(){
      let firebaseDB = db.collection('cities');
      
      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {
          if (doc.type == "added") {
            try {
              const response = await axios.get(
        
        `https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=imperial&APPID=${this.APIkey}`);
        const data = response.data;

        firebaseDB.doc(doc.doc.id).update({
         CurrentWeather: data,
        }).then(() => {
          this.cities.push(doc.doc.data());
        })
            }catch (err){
             console.log(err);
            }
          }
        });
      });
    },
    
  },
};
</script>
<style lang="scss">
 body {
   background-color: #000;
 }
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;
  
  .container {
    padding: 0 20px;
  }
}
</style>

<!-- From JujuBug to your Devices! -->
