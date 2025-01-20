<template>
  <header>
    <nav>

      <div class="menu-logo">
        <FontAwesomeIcon icon="fa-solid fa-burger" size="lg" />
        <span>Food App</span>
      </div>

      <i class="pi pi-bars menu-icon" @click="menuOpen = !menuOpen"></i>
      <Drawer v-model:visible="menuOpen">
        <ul class="drawer-links" @click="menuOpen = false">
          <li>
            <router-link to="/">
              <FontAwesomeIcon icon="fa-solid fa-house" /> Home
            </router-link>
          </li>
          <li>
            <router-link to="/menu/appetizers">
              <FontAwesomeIcon icon="fa-solid fa-utensils" /> Appetizers
            </router-link>
          </li>
          <li>
            <router-link to="/menu/entrees">
              <FontAwesomeIcon icon="fa-solid fa-utensils" /> Entrees
            </router-link>
          </li>
          <li>
            <router-link to="/menu/main courses">
              <FontAwesomeIcon icon="fa-solid fa-utensils" /> Main Courses
            </router-link>
          </li>
          <li>
            <router-link to="/menu/desserts">
              <FontAwesomeIcon icon="fa-solid fa-cake" /> Desserts
            </router-link>
          </li>
        </ul>
      </Drawer>

      <div class="nav-links-container">
        <ul class="nav-links">
          <li>
            <router-link to="/">
              <FontAwesomeIcon icon="fa-solid fa-house" /> Home
            </router-link>
          </li>
          <li>
            <router-link to="/menu/appetizers">
              <FontAwesomeIcon icon="fa-solid fa-burger" /> Appetizers
            </router-link>
          </li>
          <li>
            <router-link to="/menu/entrees">
              <FontAwesomeIcon icon="fa-solid fa-utensils" /> Entrees
            </router-link>
          </li>
          <li>
            <router-link to="/menu/main courses">
              <FontAwesomeIcon icon="fa-solid fa-plate-wheat" /> Main Courses
            </router-link>
          </li>
        </ul>
      </div>

    </nav>
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <section>
      <h3>Schedule</h3>
      <ul>
        <li><span>Monday:</span> 11:00 - 18:00</li>
        <li><span>Tuesday:</span> 11:00 - 18:00</li>
        <li><span>Wednesday:</span> 11:00 - 18:00</li>
        <li><span>Thursday:</span> 11:00 - 18:00</li>
        <li><span>Friday:</span> 11:00 - 16:00</li>
        <li><span>Saturday and Sunday:</span> Closed</li>
      </ul>
      <h3>Contact</h3>
      <ul>
        <li><span>Phone:</span> (555) 555-5555</li>
        <li><span>Email:</span> fake@example.com</li>
        <li><span>Address:</span> 123 Main St, Anytown USA</li>
      </ul>
    </section>
    <section>
      <h3>Legal</h3>
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Use</a></li>
        <li><a href="#">Refund Policy</a></li>
      </ul>
      <h3>Follow Us</h3>
      <ul class="social-icons">
        <li><i class="pi pi-facebook"></i><a href="#">Facebook</a></li>
        <li><i class="pi pi-twitter"></i><a href="#">Twitter</a></li>
        <li><i class="pi pi-instagram"></i><a href="#">Instagram</a></li>
      </ul>
    </section>
    <section>
      <h3>Newsletter</h3>
      <p>Sign up for our newsletter to get the latest updates.</p>
      <InputGroup>
        <InputText type="text" placeholder="Enter your email address" />
        <InputGroupAddon>
          <Button icon="pi pi-arrow-right" />
        </InputGroupAddon>
      </InputGroup>
      <p>By signing up, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.</p>
      <p>&copy; 2023 Food App. All rights reserved.</p>
    </section>
  </footer>
  <div class="footer-banner">
    <p>&copy; 2024. All rights reserved.</p>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useAppStore } from './stores/app';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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
header {
  width: 100%;
  height: 80px;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  background-color: var(--p-amber-600);
}

nav {
  width: 90%;
  display: flex;
  margin: auto;
  justify-content: space-between;
  align-items: center;
}

.nav-links-container {
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 1em;
}

.nav-links-container .p-inputgroup {
  width: fit-content;
}

.nav-links-container .p-inputgroupaddon {
  background-color: var(--p-amber-500);
  border: none;
  color: #fff;
}

.nav-links {
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

.nav-links li a {
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

.nav-links li a:hover {
  color: var(--p-amber-500);
  background-color: #fff;
}

.menu-icon {
  display: none;
  color: #fff
}

.menu-logo {
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

main {
  min-height: 100vh;
}

footer {
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

footer section {
  width: 400px;
  color: #fff;
  font-size: 0.8em;
}

footer section h3 {
  margin-bottom: 1em;
  font-size: 1.5em;
  border-bottom: 1px solid #fff;
  padding-bottom: 0.5em;
  margin-top: 2em;
}

footer section ul {
  list-style: none;
  padding: 0;
  color: #fff;
}

footer section ul li {
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

footer section ul li a {
  text-decoration: none;
  color: #fff;
}

.social-icons li {
  justify-content: flex-start;
  gap: 0.5em;
}

.footer-banner {
  width: 100%;
  background: var(--p-amber-600);
  text-align: center;
  font-size: 0.8em;
  padding: 1em;
  color: #fff;
}


@media screen and (max-width: 414px) and (orientation: portrait) {
  header {
    background: var(--p-amber-600);
    height: 40px;
    margin: 0;
  }

  .nav-links {
    display: none;
  }

  .menu-icon {
    display: block;
    cursor: pointer;
  }

  .menu-logo {
    font-size: 1.5em;
    position: absolute;
    color: #fff;
    right: 1em;
  }

  .drawer-links {
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

  .drawer-links li {
    width: 100%;
    margin: 0.5em 0;
    border-bottom: 1px solid var(--p-amber-500);
  }

  .drawer-links li a {
    text-decoration: none;
    color: var(--p-amber-600);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5em;
    padding: 0.5em 0;
  }

  .drawer-links li a svg {
    width: 1.5em;
  }
}

@media screen and (min-width: 1024px) {
  footer {
    padding: 1em 15em;
    gap: 12%;
  }

  footer section {
    width: fit-content;
    font-size: 1em;
  }
}
</style>