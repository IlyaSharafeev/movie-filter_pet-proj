<template>
  <div class="container-card inactive">
    <div class="card" :title="movie.title">
      <div class="card-side card-front">
        <div class="card-img">
          <img v-if="movie.posterUrlPreview" :src="movie.posterUrlPreview" alt="card img"/>
          <img v-else src="@/assets/images/error-download-image.png" alt="error download"/>
        </div>
        <div class="card-info">
          <div class="card-info__title">{{movie.nameRu}}</div>
          <div class="card-info__description" :title="movie.genres[0].genre">{{movie.genres[0].genre}}</div>
          <div class="card-info__rating" :title="movie.ratingKinopoisk || movie.rating">{{movie.ratingKinopoisk || movie.rating}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  movie: {default: '', type: Object}
})
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Maven+Pro&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&display=swap')

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

// Border
$border-radius-card: 10px


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
  border-radius: $border-radius-card
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
    scale: 110%
  &:hover:after
    opacity: 1

  .card-side
    -webkit-backface-visibility: hidden
    backface-visibility: hidden
    position: absolute
    +size(100%, 100%)
    border-radius: $border-radius-card
    background-color: $l1

  .card-front
    z-index: 2

  .card-info
    padding: 16px

    .card-info__title
      font-weight: bold
      font-size: 18px
      font-family: 'Maven Pro', sans-serif
      white-space: nowrap
      overflow: hidden
      padding: 0 0 10px 0
      text-overflow: ellipsis

    .card-info__description
      position: absolute
      bottom: 20px
      font-family: 'Inconsolata', monospace
      display: -webkit-box
      -webkit-line-clamp: 2 // количество строк
      -webkit-box-orient: vertical
      overflow: hidden

    .card-info__rating
      position: absolute
      right: 0
      bottom: 0
      background: #794d00
      color: gainsboro
      padding: 5px 10px
      text-transform: uppercase
      font-weight: bold
      border-radius: $border-radius-card 0 $border-radius-card 0


// --------------
// Front of card
// --------------

.card-front
  .card-img
    background-color: $l2
    background-position: center
    background-size: cover
    border-radius: $border-radius-card $border-radius-card 0 0
    +size(100%, 250px)

    img
      border-radius: $border-radius-card $border-radius-card 0 0
      width: 100%
      height: 100%
</style>