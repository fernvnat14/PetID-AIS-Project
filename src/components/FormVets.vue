<template>
  <div>
    <v-card>
      <v-responsive :aspect-ratio="16/9">
        <v-card-text>
        <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md8
      >
        <v-card flat>
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>Done!</span>
      <v-icon dark>mdi-checkbox-marked-circle</v-icon>
    </v-snackbar>
    <v-form ref="form" @submit.prevent="submit">

      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.First_name"
              :rules="rules.name"
              color="yellow darken-3"
              label="First name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.Last_name"
              :rules="rules.name"
              color="yellow darken-3"
              label="Last name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.Hospital_name"
              color="yellow darken-3"
              label="Hospital"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.License_no"
              color="yellow darken-3"
              label="License no."
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.Contact"
                :rules="rules.Contact"
                prepend-icon="mdi-phone"
                color="yellow darken-3"
                label="Contact"
                required
              ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text @click="resetForm">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!formIsValid"
          text
          color="primary"
          type="submit"
        >Submit</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
        
      </v-flex>
    </v-layout>
  </v-container> 
        </v-card-text>
      </v-responsive>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from 'axios'
import Auth from '@/components/Auth.vue'
export default {
    data () {
    const defaultForm = Object.freeze ({
        UserID:'',
        First_name: '',
        Last_name: '',
        Hospital_name: '',
        License_no:'',
        Contact:''
    })
    return {
      form: Object.assign({}, defaultForm),
      rules: {
        Hospital_name: [val => (val || '').length > 0 || 'This field is required'],
        name: [val => (val || '').length > 0 || 'This field is required'],
        License_no: [val => (val || '').length > 0 || 'This field is required'],
        Contact: [val => (val || '').length > 0 || 'This field is required']
      },
      snackbar: false,
      vetsinfo: [],
      defaultForm
    }
    },

    computed: {
        formIsValid () {
            return (
            this.form.First_name &&
            this.form.Last_name &&
            this.form.Hospital_name &&
            this.form.License_no &&
            this.form.Contact 
            )
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
        console.log(this.userinfo)
      })
      .catch(error => {
        console.log(error)
      })
    },

    methods: {
        resetForm () {
            this.form = Object.assign({}, this.defaultForm)
            this.$refs.form.reset()
        },

        submit() {
          if (this.vetsinfo.length == 0 ) {
            this.snackbar = true
            //this.resetForm()
            const uid = firebase.auth().currentUser.uid;
            //console.log(uid)
            console.log('INSERTED')
            axios.post('https://skilled-array-252503.appspot.com/register/vet', {
                "UserID": uid,
                "First_name": this.form.First_name,
                "Last_name": this.form.Last_name,
                "Hospital_name": this.form.Hospital_name,
                "License_no": this.form.License_no,
                "Contact": this.form.Contact
            })
            .then(response => {
                this.vets = response.data;
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            });
          } else {
            this.snackbar = true
            //this.resetForm()
            const uid = firebase.auth().currentUser.uid;
            //console.log(uid)
            console.log('UPDATED')
            axios.patch('https://skilled-array-252503.appspot.com/update/vets/'+uid, {
                "First_name": this.form.First_name,
                "Last_name": this.form.Last_name,
                "Hospital_name": this.form.Hospital_name,
                "License_no": this.form.License_no,
                "Contact": this.form.Contact
            })
            .then(response => {
                this.vets = response.data;
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            });
          }
        }
    }
};
</script>
