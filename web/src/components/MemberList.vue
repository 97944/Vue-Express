<template>
  <v-container>
    <v-layout row>
      <v-flex xs4 v-for="(member, index) in members" :key="index">
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">{{member.fname}} {{member.lname}}</v-list-item-title>
              <v-list-item-subtitle>{{member.company}} {{member.dept}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey">
              <v-img :src="member.image_path"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    members: []
  }),
  created: function(){
    axios.get("/users")
      .then((res) => {
        this.members = res.data;
      });
  },
};
</script>

<style>
  .container {
    margin-top: 30px;
  }
</style>
