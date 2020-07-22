<template>
 <div>
    <div>Version</div>
    <div>{{ metadata.build }}</div>
    <div>Date</div>
    <div>{{ metadata.date }}</div>
 </div>
</template>
<script>
import metadata from "@/metadata.json";
export default {
  data: () => ({
    metadata: {
      time: "",
      build: "",
      version: "",
      date: "",
    },
  }),
  created() {
    this.metadata.build=metadata.build;
    this.metadata.date=metadata.date;
  },
};
</script>
<style></style>
