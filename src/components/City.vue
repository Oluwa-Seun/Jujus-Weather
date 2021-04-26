<template>
  <div class="city">
      <span>{{ this.city.city }}</span>
      <div class="weather">
          <span>{{ Math.round(this.city.CurrentWeather.main.temp) }}&deg;</span>
          <img :src="require(`../../public/condition/${this.city.CurrentWeather.weather[0].icon}.svg`)" alt="icons" />
      </div>
      <div class="videos">
          <video autoplay loop muted :src="require(`../../public/videos/${this.city.CurrentWeather.weather[0].icon}.mp4`)"></video>
          <div class="bg-overlay">
              </div> 
      </div>
  </div>
</template>

<script>
import db from "../firebase/firebaseinit";
export default {
  name: "city",
  props: ["city", "edit"],
  created() {},
  data() {
    return {
      id: null,
    };
  },
  methods: {
    removeCity() {
      db.collection("cities")
        .where("city", "==", `${this.city.city}`)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            this.id = doc.id;
          });
        })
        .then(() => {
          db.collection("cities")
            .doc(this.id)
            .delete();
        });
    },
  },
};
</script>

<style>

</style>
<style lang="scss" scoped>

.city {
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 20px;
    flex-basis: 50px;
    min-height: 250px;
    color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);

    span {
        z-index: 1;
        text-transform: capitalize;
        display: block;
        font-size: 25px;
        font-weight: 600;
    }

    .weather {
    display: flex;
    z-index: 1;
    justify-content: flex-end;
    align-items: flex-end;
    flex: 1;
    
    span {
     font-size: 35px;
     margin-right: 8px;
    }

    img {
        height: 20px;
        width: auto;
    }
 }
 .videos {
     overflow: hidden;
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;

     .videos {
         height: 120%;
         @media (min-width: 900px) {
             height: auto;
             width: 100%;
         }
     }

    .bg-overlay {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        background-color: rgba(0,0,0,0.2);
    }
 }
}

</style>