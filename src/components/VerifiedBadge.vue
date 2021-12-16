<template>
    <vs-tooltip style="display: inline;">
        <i class='bx bx-badge-check' style="color: #6363dd"></i>
        <template #tooltip>
          Verified!
        </template>
    </vs-tooltip>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class VerifiedBadge extends Vue {}
</script>