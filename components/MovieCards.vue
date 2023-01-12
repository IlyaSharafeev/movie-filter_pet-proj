<template>
  <div class="container-card inactive">
    <div class="card">
      <div class="card-side card-front">
        <div class="card-img"></div>
        <div class="card-info">
          <h2>title</h2>
          <p>desk</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// const cards = document.querySelectorAll('.card');
//
// function transition() {
//   if (this.classList.contains('active')) {
//     this.classList.remove('active')
//   } else {
//     this.classList.add('active');
//   }
// }
//
// cards.forEach(card => card.addEventListener('click', transition));
</script>

<style scoped lang="sass">

// --------------
// Global styles
// --------------

*, *:after, *:before
  box-sizing: border-box

// Color Variables
$l1: hsla(0, 0%, 100%, 1)
$l2: hsla(223, 13%, 87%, 1)
$l3: hsla(0, 0%, 77%, 1)
$d1: hsla(0, 0%, 20%, 1)
$d2: #555
$p1: #FFC324
$g1: #FFB714
$g2: #FFE579

// Mixins
=size($x, $y)
  width: $x
  height: $y

// Text
h2, h4, p, ul, li
  margin: 0
  padding: 0

h2, h4
  font-family: 'Oswald', sans-serif
  text-transform: uppercase
  color: $d1

h2
  font-size: 27px
  font-weight: 500
  letter-spacing: -0.2px
  margin-bottom: 10px

p, li
  font-family: "Roboto", sans-serif
  font-weight: 400
  color: $d2
  line-height: 22px

ul, li
  text-decoration: none
  list-style: disc outside

ul
  padding-left: 20px

svg
  margin: 0
  min-width: 24px
  min-height: 24px



// --------------
// Overall card
// --------------

.container-card
  position: relative
  +size(260px, 400px)
  min-width: 250px
  min-height: 300px
  margin: 4px

// .active is applied to .card when .card is clicked.
.active
  transform: translateZ(0px) rotateY(180deg) !important
  &:after
    display: none
// &:hover:after
//   opacity: 0 !important

.card
  display: inline-block
  +size(100%, 100%)
  cursor: pointer
  -moz-backface-visibility: hidden
  transform-style: preserve-3d
  transform: translateZ(-100px)
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)
  // :after allows for a more performant box-shadow because only opacity is being animated.
  &:after
    content: ''
    position: absolute
    z-index: -1
    +size(100%, 100%)
    border-radius: 5px
    box-shadow: 0 14px 50px -4px hsla(0, 0%, 0%, 0.15)
    opacity: 0
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1.4)
  &:hover
    transform: translateZ(0px)
  &:hover:after
    opacity: 1

  .card-side
    -webkit-backface-visibility: hidden
    backface-visibility: hidden
    position: absolute
    +size(100%, 100%)
    border-radius: 5px
    background-color: $l1

  .card-front
    z-index: 2

  .card-info
    padding: 16px



// --------------
// Front of card
// --------------

.card-front
  .card-img
    background-color: $l2
    background-position: center
    background-size: cover
    border-radius: 5px 5px 0 0
    +size(100%, 250px)
</style>