<template>

  <v-card
    class="mx-auto"
    max-width="500"
    raised
  >
    <v-list-item three-line>
      <v-list-item-content v-for="(item, index) in this.vetsinfo" :key="index">
        <div class="overline mb-4">Veterinarian Information</div>
        <v-list-item-title class="headline mb-1">Welcome, {{item.First_name}} {{item.Last_name}}</v-list-item-title>
        <v-list-item-subtitle>Hospital: {{item.Hospital_name}}</v-list-item-subtitle>
        <v-list-item-subtitle>License No: {{item.License_no}}</v-list-item-subtitle>
        <v-list-item-subtitle>Contact: {{item.Contact}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-avatar size="80">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTa5I4tl8C46caeX2Z0HT0_sbzOP9vda4WkGv3CH3wJ8nXhVw0Q"
        >
      </v-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn 
      text 
      to="/formvets"
      >
        <v-icon :small="true" color="yellow darken-3">mdi-account-edit</v-icon>
        <span class="mr-2 blue-grey--text text--darken-3">Edit</span>
      </v-btn>
      <v-btn 
      text 
      to="/post"
      >
        <v-icon :small="true" color="yellow darken-3">mdi-clipboard-pulse-outline</v-icon>
        <span class="mr-2 blue-grey--text text--darken-3">Medical Records</span>
      </v-btn>
      <!-- <v-btn
      
        color="error"
        @click="overlay = !overlay"
        >
        Show Overlay
      </v-btn>

        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
            <v-btn
                icon
                @click="overlay = false"
            >
                <v-img
                    :src="qr.png"
                    aspect-ratio="1"
                >
                </v-img>
            </v-btn>
        </v-overlay> -->
    
      <v-btn 
      text 
      @click="overlay = !overlay"
      >
        <v-icon :small="true" color="yellow darken-3">mdi-qrcode-scan</v-icon>
        <span class="mr-2 blue-grey--text text--darken-3">My QR Code</span>
      </v-btn>
      <v-overlay :value="overlay">
        <v-btn
            icon
            @click="overlay = false"
        >
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-overlay>
    </v-card-actions>
    

  </v-card>
  
</template>

<script>
import axios from 'axios'
import firebase from "firebase"
import Auth from '@/components/Auth.vue'
export default {
  data () {
    return {
      vetsinfo: [],
      loading: true,
      overlay: false,
     
    }
  },
  mounted () {
    const uid = firebase.auth().currentUser.uid;
    console.log(uid)
    axios
      .get('https://skilled-array-252503.appspot.com/allvets/userid/'+uid)
      .then(response => {
        this.vetsinfo = response.data
        this.loading = false
        console.log(this.petinfo)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {

  }
}
</script>
