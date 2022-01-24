<template>
  <v-container class="listing-home-container">
    <v-card elevation="1">
      <v-card-title>
        <div v-if="allMoviesShowing">
          All Movies
        </div>
        <div v-else>
          My Favourites
        </div>
        <v-spacer />
        <v-text-field
          id="search-text-field"
          v-model="search"
          append-icon="mdi-magnify"
          hide-details
          label="Search"
          single-line
          @keypress="processSearch"
          @keyup.delete="processSearch"
        />
        <v-spacer />
        <v-btn
          id="favourites-btn"
          outlined
          @click="chooseMoviesToShow(!allMoviesShowing)"
        >
          <div v-if="!allMoviesShowing">
            Show All
          </div>
          <v-badge
            v-else
            :content="favouriteMovieCount"
            :value="favouriteMovieCount"
            color="red"
            overlap
          >
            <v-icon>mdi-heart</v-icon>
            Favourites
          </v-badge>
        </v-btn>
      </v-card-title>
      <v-data-table
        id="main-table"
        :headers="tableHeaders"
        :items="filteredItems"
        :loading="moviesStillLoading"
        :options.sync="pagination"
        :server-items-length="totalNumberOfMovies"
        loading-text="Loading... Please wait"
        @pagination="paginate"
      >
        <template v-slot:item.favourite="{ item }">
          <v-simple-checkbox
            v-model="item.favourite"
            class="favouriteCheckbox"
            :ripple="false"
            color="#007991"
          />
        </template>
      </v-data-table>
    </v-card>
    <div class="text-center">
      <v-snackbar
        v-model="snackbar"
        :snackbar-timeout="snackbarTimeout"
        multi-line
      >
        {{ snackbarText }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            CLOSE
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <v-overlay
      :value="overlay"
      opacity="0.9"
    >
      <div
        class="lds-ellipsis"
      >
        <div />
        <div />
        <div />
        <div />
      </div>
    </v-overlay>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref } from '@vue/composition-api'
import useMovieProcessing from '@/composables/movieProcessing'

export default Vue.extend({
  name: 'ListingHome',
  setup () {
    const {
      allMovies,
      allMoviesShowing,
      favouriteMovies,
      favouriteMovieCount,
      filteredItems,
      overlay,
      movies,
      moviesStillLoading,
      pagination,
      search,
      snackbar,
      totalNumberOfMovies,
      chooseMoviesToShow,
      paginate,
      processSearch
    } = useMovieProcessing()
    const listSize = ref([10])
    const snackbarText = ref('You have no favourites at the moment. Please add to continue.')
    const snackbarTimeout = ref(2000)
    const tableHeaders = ref([
      {
        text: 'IMDB ID',
        align: 'start',
        value: 'imdbID'
      },
      {
        text: 'Movie Title',
        value: 'Title'
      },
      {
        text: 'Year',
        value: 'Year'
      },
      {
        text: 'Favourite',
        sortable: true,
        value: 'favourite'
      }
    ])

    return {
      allMovies,
      allMoviesShowing,
      favouriteMovies,
      favouriteMovieCount,
      filteredItems,
      listSize,
      overlay,
      movies,
      moviesStillLoading,
      pagination,
      search,
      snackbar,
      snackbarText,
      snackbarTimeout,
      tableHeaders,
      totalNumberOfMovies,
      chooseMoviesToShow,
      paginate,
      processSearch
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/overlay';

#favourites-btn {
  color: $primaryDarkGreenBlueColor;
  background-color: white;
  text-transform: none;
}

</style>
