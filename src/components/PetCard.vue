<template>

  <v-card
    class="mx-auto"
    max-width="500"
    raised
  >
    <v-list-item three-line>
      <v-list-item-content v-for="(item, index) in this.petinfo" :key="index">
        <div class="overline mb-4">My Pet</div>
        <v-list-item-title class="headline mb-1">Name: {{item.Pet_name}}</v-list-item-title>
        <v-list-item-subtitle>Birthday: {{item.Bd_pet}}</v-list-item-subtitle>
        <v-list-item-subtitle>Appearance: {{item.Appearance}}</v-list-item-subtitle>
        <v-list-item-subtitle>Type: {{item.Type}}</v-list-item-subtitle>
        <v-list-item-subtitle>Breed: {{item.Breed}}</v-list-item-subtitle>
        <v-list-item-subtitle>Color: {{item.Color}}</v-list-item-subtitle>
        <v-list-item-subtitle>Gender: {{item.Gender}}</v-list-item-subtitle>
        <v-list-item-subtitle>PetID: {{item.PetID}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-avatar size="80">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR9If4Gu6PXQCRYC8q-iXEEj_cuQfyfIAuv3j8Z4hQRSCRNFzaJ"
        >
      </v-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn 
      text 
      to="/FormPetID"
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
      petinfo: [],
      loading: true,
      overlay: false,
     
    }
  },
  mounted () {
    const uid = firebase.auth().currentUser.uid;
    console.log(uid)
    axios
      .get('https://skilled-array-252503.appspot.com/allpets/userid/'+uid)
      .then(response => {
        this.petinfo = response.data
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
