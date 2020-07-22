<template>
 

        <v-flex>
          <div class="caption grey--text">Version</div>
          <div>{{ metadata.build }}</div>
          <div class="caption grey--text">Date</div>
          <div>{{ metadata.date }}</div>       
        
        </v-flex>
       
    </v-container>
    
  </v-card>
</template>

<script>
import metadata from "@/metadata.json";
import { mapState, mapActions } from "vuex";
//import vue2Dropzone from "vue2-dropzone";
//import "vue2-dropzone/dist/vue2Dropzone.min.css";
let uuid = require("uuid");

export default {
  components: {
    //vueDropzone: vue2Dropzone,
  },
  data: () => ({
    metadata: {
      time: "",
      build: "",
      version: "",
      date: "",
    },
    parametres: {},
    dropzoneOptions: {
      url: "https://httpbin.org/post",
      thumbnailWidth: 150,
      thumbnailHeight: 150,
      addRemoveLinks: false,
      acceptedFiles: ".jpg, .jpeg, .png",
      dictDefaultMessage: `<p class='text-default'><i class='fa fa-cloud-upload mr-2'></i> Glisser les images ici</p>`,
    },
    images: [],
  }),
  created() {
    if (!this.isAdmin) {
      this.$router.push("/");
    }
    this.metadata.build=metadata.build;
    this.metadata.date=metadata.date;


    this.realitimeListenerParametres();
  },
  methods: {
    realitimeListenerParametres() {
      //self.groupe = doc.data();
      let self = this;
      this.$firebase
        .firestore()
        .collection("options")
        .doc("VB08AelKInuKBr3fG6fM")
        .onSnapshot(function (doc) {
          var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          self.parametres = doc.data();
        });
    },

    /*  async afterComplete(upload) {
      let self = this;
      var imageName = uuid.v1();
      this.isLoading = true;
      try {
        //save image
        let file = upload;
        var metadata = {
          contentType: "image/png",
          cacheControl: "public,max-age=4000",
        };

        var storageRef = this.$firebase.storage().ref();
        var imageRef = storageRef.child(`systeme/${imageName}.png`);
        await imageRef.put(file, metadata);
        var downloadURL = await imageRef.getDownloadURL();
        this.images.push({ src: downloadURL });

        var logo = self.$firebase
          .firestore()
          .collection("options")
          .doc("VB08AelKInuKBr3fG6fM");

        // Set the "capital" field of the city 'DC'
        return logo
          .update({
            url_logo: downloadURL,
          })
          .then(function () {
            console.log("Document successfully updated!");
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      } catch (error) {
        console.log(error);
      }
      this.$refs.imgDropZone.removeFile(upload);
    }, */
    ...mapActions({
      userLogOut: "Auth/userSignOut",
    }),
  },
  computed: {
    ...mapState({
      isAdmin: (state) => state.Auth.isAdmin,
    }),
  },
};
</script>
<style></style>
