<template>
  <v-card
    class="mx-auto"
    max-width="800"
    raised
  >
    <v-card-title>
      Medical Records
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
    v-for="(item, index) in medinfo"
        :key="index"
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import firebase from "firebase";
import axios from 'axios'
import Auth from '@/components/Auth.vue'
import { stringify } from 'querystring';

  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Date',
            align: 'left',
            sortable: false,
            value: 'Date',
          },
          { text: 'Description', value: 'Description' },
          { text: 'Diagnosis', value: 'Diagnosis' },
          { text: 'Hospital Name', value: 'Hospital' },
          { text: 'Veterinarian', value: 'Veterinarian' },
          { text: 'Lisense No.', value: 'License' },
        ],
        desserts: [
          {
            Date: '11092019',
            Description: 'Wellness Check',
            Diagnosis: 'Wellness Check',
            Hospital: 'CIE1 Vet',
            Veterinarian: 'Dr.Sommah Narak',
            License: '21039324839',
          }
        ],
        petinfo: [],
        medinfo: []
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
      });
    this.Medrec()
    },

    methods: {
        Medrec() {
            const uid = firebase.auth().currentUser.uid;
            const p = this.petinfo.map(pid => pid.PetID);
            console.log(p)
            axios
            .get('https://skilled-array-252503.appspot.com/allmedicals/'+p)
            .then(response => {
                this.medinfo = response.data
                this.loading = false
                console.log(this.medinfo)
            })
            .catch(error => {
                console.log(error)
            })
        }

    }
  }
</script>