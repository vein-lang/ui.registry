<template>
  <div style="padding-top: 100px; padding-left: 20px" ref="content">
    <div class="flex-container">
      <div class="row">
        <div class="flex-item">
          <img src="./../assets/logo.png" width="128" height="128" />
        </div>
        <div class="flex-item">
          <h3>Privacy Policy.</h3>
        </div>
        <vs-divider color="warning"> Version 1.0, dated 2021-12-15 </vs-divider>
        <div class="flex-item text-item">
          The Vein Lang maintains several services related to the Vein Project,
          including the <a href="vein-lang.org">vein-lang.org</a> and
          <a href="ui.registry.vein-lang.org">ui.registry.vein-lang.org</a> (the
          “Services”).<br />
          This privacy notice explains what we do with personal information.
        </div>
        <vs-divider color="warning"> vein-lang.org </vs-divider>
        <div class="flex-item text-item">
          When you visit <a href="vein-lang.org">vein-lang.org</a> and all
          subdomains, we receive your IP address as part of our standard server
          logs. We store these logs for 1 year.
        </div>
        <vs-divider color="warning"> Logging in with GitHub </vs-divider>
        <div class="flex-item text-item">
          <a href="ui.registry.vein-lang.org">ui.registry.vein-lang.org</a>
          requires users to have a GitHub account in order to log in and use the
          service.<br />
          When you log in to
          <a href="ui.registry.vein-lang.org">ui.registry.vein-lang.org</a>
          using a GitHub account, we receive your GitHub username and avatar.
          <br />If you share a display name or public email address in your
          GitHub public profile, we also receive that information.
        </div>
        <vs-divider color="warning"> Error monitoring </vs-divider>
        <div class="flex-item text-item">
          <a href="ui.registry.vein-lang.org">ui.registry.vein-lang.org</a>
          uses Sentry, an error monitoring service, to help the Vein Project
          team discover and fix the performance of the code.<br />
          When there is an error, Sentry receives basic information about how
          you interacted with the website and the actions that led to the
          error.<br />
          Additionally, your IP address may be disclosed to Sentry as part of
          the error reporting process but we’ve configured Sentry to delete it
          as soon as it’s received.<br />
          <a href="https://sentry.io/privacy/"
            >Read Sentry’s Privacy Policy here</a
          >.
        </div>
        <vs-divider color="warning"> Third-party Services </vs-divider>
        <div class="flex-item text-item">
          We use Google Cloud and Vercel to host the Services, on servers
          located in the US.
          <br />
          <a href="https://cloud.google.com/terms/cloud-privacy-notice">
            Google Clound's privacy notice is here </a
          >.
          <br />
          <a href="https://vercel.com/legal/privacy-policy">
            Vercel’s privacy notice is here </a
          >.
          <br />
          GitHub login is used for authentication in ui.registry.vein-lang.org
          and (optionally) in the forums.
          <a> GitHub’s Privacy Statement can be found here. </a>
        </div>
        <vs-divider color="warning"> Authentication provider </vs-divider>
        <div class="flex-item text-item">
          <a href="ui.registry.vein-lang.org">ui.registry.vein-lang.org</a>
          uses the <a href="auth0.com">Auth0</a> authentication platform, an
          adaptable authentication and authorization service to simplify
          authorization and<br />
          make it more secure during authorization, Auth0 receives basic
          information, information about the
          <a href="github.com">Github</a> account, including your Avatar and
          email In addition, your IP address may be disclosed to
          <a href="auth0.com">Auth0</a> as part of the authorization process.<br />
          <a href="https://auth0.com/privacy"
            >Read Auth0’s Privacy Policy here</a
          >.
        </div>

        <vs-divider color="warning"> Information Security </vs-divider>
        <div class="flex-item text-item">
          We maintain administrative, technical, and physical safeguards
          designed to protect the privacy and security of the information we
          maintain about you. The connection between your computer and our
          servers is encrypted using Secure Sockets Layer (SSL) software that
          encrypts that information. We use a digital certificate and secure
          pages will be identified by a padlock sign and “https://” in the
          address bar.

          <br /><br />

          However, no method of transmission or storage is 100% secure. As a
          result, while we strive to protect your personal information, you
          acknowledge that: (a) there are security and privacy limitations
          inherent to the Internet which are beyond our control; and (b)
          security, integrity, and privacy of any and all information and data
          exchanged between you and us through this Site cannot be guaranteed.
        </div>

        <vs-divider color="warning"> Children’s Privacy </vs-divider>
        <div class="flex-item text-item">
          The Services are not directed to children and we do not knowingly
          collect personal information from anyone under the age of sixteen. If
          you are under the age of sixteen, your parent or guardian must provide
          their consent for you to use the services.
        </div>

        <vs-divider color="warning"> Contact </vs-divider>
        <div class="flex-item text-item">
          For data subject access requests, or any questions about this privacy notice, 
          please email support at <div v-html="'privacy' + '@' + 'vein-lang.org'"/>
        </div>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>
<script lang="ts">
import VsDivider from "@/components/vsDivider.vue";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: { VsDivider },
})
export default class PrivacyPolicy extends Vue {
  metaInfo() {
    return  {
      title: `Privacy policy`,
      meta: [
        { name: 'description', content: `Vein gallery privacy policy` }
      ]
    }
  }

  goToBack() {
    this.$router.push({ path: "/" });
  }
}
</script>
<style scoped>
html,
body {
  height: 100%;
}
body {
  margin: 0;
}
.flex-container {
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.row {
  width: auto;
}
.flex-item {
  font-weight: bold;
  font-size: 2em;
  text-align: center;
}
.flex-item.text-item {
  font-size: 1em;
  max-width: 800px;
  text-align: left;
}
a {
  color: #18a3c5;
}
</style>