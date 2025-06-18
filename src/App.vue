<template>
  <header class="header">
    <nav class="nav">

      <div class="logo">

        <span>Food App</span>
      </div>

      <i class="pi pi-bars mobile-menu" @click="menuOpen = !menuOpen"></i>
      <Drawer v-model:visible="menuOpen">
        <ul class="drawer__list" @click="menuOpen = false">
          <li class="drawer__list-item">
            <router-link to="/">
              Home
            </router-link>
          </li>
          <li class="drawer__list-item">
            <router-link to="/menu/appetizers">
              Appetizers
            </router-link>
          </li>
          <li class="drawer__list-item">
            <router-link to="/menu/entrees">
              Entrees
            </router-link>
          </li>
          <li class="drawer__list-item">
            <router-link to="/menu/main course">
              Main Courses
            </router-link>
          </li>
          <li class="drawer__list-item">
            <router-link to="/menu/desserts">

            </router-link>
          </li>
        </ul>
      </Drawer>

      <div class="nav__links">
        <ul class="nav__list">
          <li>
            <router-link to="/">
              Home
            </router-link>
          </li>
          <li>
            <router-link to="/menu/appetizers">
              Appetizers
            </router-link>
          </li>
          <li>
            <router-link to="/menu/entrees">
              Entrees
            </router-link>
          </li>
          <li>
            <router-link to="/menu/main course">
              Main Courses
            </router-link>
          </li>
        </ul>
      </div>

    </nav>
  </header>
  <main class="main">
    <router-view></router-view>
  </main>
  <footer class="footer">
    <section class="footer__section contact-info">
      <h3 class="footer__section-title">Schedule</h3>
      <ul class="footer__list">
        <li class="footer__list-item"><span>Monday:</span> 11:00 - 18:00</li>
        <li class="footer__list-item"><span>Tuesday:</span> 11:00 - 18:00</li>
        <li class="footer__list-item"><span>Wednesday:</span> 11:00 - 18:00</li>
        <li class="footer__list-item"><span>Thursday:</span> 11:00 - 18:00</li>
        <li class="footer__list-item"><span>Friday:</span> 11:00 - 16:00</li>
        <li class="footer__list-item"><span>Saturday and Sunday:</span> Closed</li>
      </ul>
      <h3 class="footer__section-title">Contact</h3>
      <ul class="footer__list">
        <li class="footer__list-item"><span>Phone:</span> (555) 555-5555</li>
        <li class="footer__list-item"><span>Email:</span> fake@example.com</li>
        <li class="footer__list-item"><span>Address:</span> 123 Main St, Anytown USA</li>
      </ul>
    </section>
    <section class="footer__section legal-info">
      <h3 class="footer__section-title">Legal</h3>
      <ul class="footer__list">
        <li class="footer__list-item">Privacy Policy</li>
        <li class="footer__list-item">Terms of Use</li>
        <li class="footer__list-item">Refund Policy</li>
      </ul>
      <h3 class="footer__section-title">Follow Us</h3>
      <ul class="footer__list social-icons">
        <li class="footer__list-item"><i class="pi pi-facebook"></i>Facebook</li>
        <li class="footer__list-item"><i class="pi pi-twitter"></i>Twitter</li>
        <li class="footer__list-item"><i class="pi pi-instagram"></i>Instagram</li>
      </ul>
    </section>
    <section class="footer__section newsletter">
      <h3 class="footer__section-title">Newsletter</h3>
      <p>Sign up for our newsletter to get the latest updates.</p>
      <InputGroup>
        <InputText type="text" placeholder="Enter your email address" />
        <InputGroupAddon>
          <Button icon="pi pi-arrow-right" />
        </InputGroupAddon>
      </InputGroup>
      <p>By signing up, you agree to our Terms of Use and Privacy Policy.</p>
      <p>&copy; 2023 Food App. All rights reserved.</p>
    </section>
  </footer>
  <div class="footer__banner">
    <p>&copy; 2024. All rights reserved.</p>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useAppStore } from './stores/app';
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';


const appStore = useAppStore();

const menuOpen = ref(false);

onBeforeMount(async () => {
  await appStore.fetchFoodItems();
})

</script>
<style scoped>
.header {
  width: 100%;
  height: 80px;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  background-color: var(--p-amber-600);
}

.nav {
  width: 90%;
  display: flex;
  margin: auto;
  justify-content: space-between;
  align-items: center;
}

.nav__links {
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 1em;
}

.nav__links .p-inputgroup {
  width: fit-content;
}

.nav__links .p-inputgroupaddon {
  background-color: var(--p-amber-500);
  border: none;
  color: #fff;
}

.nav__list {
  list-style: none;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  gap: 1em;
  font-size: 0.9em;
}

.nav__list li a {
  text-decoration: none;
  color: #fff;
  font-size: 1.2em;
  padding: 0.25em;
  border-radius: 0.25em;
  transition: all 0.1s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.nav__list li a:hover {
  color: var(--p-amber-500);
  background-color: #fff;
}

.mobile-menu {
  display: none;
  color: #fff
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: 2.5em;
  font-weight: bold;
  color: #fff;
  font-family: 'Dancing Script', cursive;
}

.menu-logo svg {
  font-size: 0.8em;
}

.main {
  min-height: 100vh;
}

.footer {
  width: 100%;
  background: var(--p-amber-600);
  padding: 5em;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 2em;
  margin-top: 4em;
}

.footer__section {
  width: 400px;
  color: #fff;
  font-size: 0.8em;
}

.footer__section-title {
  margin-bottom: 1em;
  font-size: 1.5em;
  border-bottom: 1px solid #fff;
  padding-bottom: 0.5em;
  margin-top: 2em;
}

.footer__list {
  list-style: none;
  padding: 0;
  color: #fff;
}

.footer__list-item {
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.social-icons .footer__list-item {
  justify-content: flex-start;
  gap: 0.5em;
}

.footer__banner {
  width: 100%;
  background: var(--p-amber-600);
  text-align: center;
  font-size: 0.8em;
  padding: 1em;
  color: #fff;
}


@media screen and (max-width: 414px) and (orientation: portrait) {
  .header {
    background: var(--p-amber-600);
    height: 40px;
    margin: 0;
  }

  .nav__links {
    display: none;
  }

  .mobile-menu {
    display: block;
    cursor: pointer;
  }

  .logo {
    font-size: 1.5em;
    position: absolute;
    color: #fff;
    right: 1em;
  }

  .drawer__list {
    list-style: none;
    display: flex;
    flex-flow: column;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    font-size: 1.2em;
  }

  .drawer__list-item {
    width: 100%;
    margin: 0.5em 0;
    border-bottom: 1px solid var(--p-amber-500);
  }

  .drawer__list-item a {
    text-decoration: none;
    color: var(--p-amber-600);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5em;
    padding: 0.5em 0;
  }

  .drawer__list-item a svg {
    width: 1.5em;
  }
}

@media screen and (min-width: 1024px) {
  .footer {
    padding: 1em 15em;
    gap: 12%;
  }

  .footer__section {
    width: fit-content;
    font-size: 1em;
  }
}
</style>