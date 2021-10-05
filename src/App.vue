<template>
  <div id="wrapper">
    <div id="nav">
      <div>
        <router-link to="/">Top</router-link>
        <span id="divider">|</span>
        <router-link to="/new">New</router-link>
      </div>
      <div id="name">
        <p>HackerNewsDemo</p>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: rgb(230, 113, 17);
  padding-bottom: 10px;
}
#divider {
  font-size: 20px;
  margin: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 20px;
  border-bottom: 2px solid rgb(0, 0, 0);
}

#nav a.router-link-exact-active {
  color: #ffffff;
}

#wrapper {
  width: 90%;
  max-width: 1000px;
  margin: 20px auto;
  border-radius: 6px;
  box-shadow: 0px 1px 6px rgba(100, 70, 70, 0.2);
  box-sizing: border-box;
  padding: 0 0 20px;
  overflow: hidden;
  border: 1px solid lightgray;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
#page-banner {
  font-size: 2rem;
  text-align: center;
  color: rgb(255, 255, 255);
}
ul {
  list-style-type: none;
  padding-inline-start: 0;
}
button {
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
  border: 0;
  margin: 7px;
}
button:hover {
  background-color: rgb(230, 113, 17);
  color: black;
}
#name p {
  margin-bottom: 0;
  font-size: small;
}
</style>
