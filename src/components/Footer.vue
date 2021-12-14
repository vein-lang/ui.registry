<template>
  <footer class="footer">
    <div class="footer__uls">
      <ul>
        <li class="title">Resources</li>
        <li><a target="_blank" href="/docs/"> Documentation </a></li>
        <li>
          <a target="_blank" href="https://github.com/vein-lang/vein">
            Github
          </a>
        </li>
        <li><a target="_blank" href="/license/"> Privacy Policy </a></li>
      </ul>
      <ul>
        <li class="title">Help</li>
        <li>
          <a
            target="_blank"
            href="https://github.com/vein-lang/vein/issues"
          >
            Github Issues
          </a>
        </li>
        <!-- <li><a target="_blank" href="/license/#faq"> FAQ </a></li> -->
      </ul>
      <ul>
        <li class="title">Community</li>
        <!-- <li>
          <a target="_blank" href="https://discord.gg/"> Discord </a>
        </li> -->
        <li>
          <a target="_blank" href="https://github.com/vein-lang/">
            Github
          </a>
        </li>
      </ul>
    </div>
    <div class="copy">
      <span class="span-copy"> Copyright © 2021 Vein Lang </span>
      <span class="span-vein"
        ><span> Created By </span>
        <a target="_blank" href="http://0xf6.moe">Yuuki Wesp</a></span
      >
    </div>
  </footer>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class Footer extends Vue {}
</script>
<style scoped>
.footer {
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 0 30px 0 0;
}
.subscribe-content {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 100px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.footer .footer__uls {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
@media (max-width: 1200px) {
  .footer ul {
    margin: 30px 10px;
    padding: 15px;
  }
}

.footer ul {
  padding: 30px;
  list-style: none;
  margin: 30px 20px;
}
ol,
p,
ul {
  line-height: 1.7;
}
.footer ul .title {
  margin-bottom: 15px;
}
.footer ul li {
  font-size: 1.1rem;
  font-weight: 700;
  opacity: 0.8;
  margin: 10px 0;
}
.title {
  text-align: left;
  margin: 0;
  width: 100%;
  padding: 5px 6px;
}
.footer ul li a {
  font-size: 0.85rem;
  opacity: 0.5;
  transition: all 0.25s ease;
  font-weight: 400;
  padding: 5px;
  display: block;
}
a {
  font-weight: 500;
  color: var(--vs-theme-color) !important;
  text-decoration: none;
}
a,
button,
input,
select,
textarea {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.footer .copy {
    position: relative;
    bottom: 0;
    width: 100%;
    max-width: 1000px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: .8rem;
    padding: 20px;
}
.footer .copy .span-copy, .footer .copy .span-vein span {
    opacity: .5;
}
</style>