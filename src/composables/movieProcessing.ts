import { computed, ref } from '@vue/composition-api'
import MovieDataService from '@/services/MovieData'
import ResponseDataType from '@/types/ResponseData'
import MovieObjectType from '@/types/MovieObject'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function movieProcessing () : any {
  const search = ref('')
  const totalNumberOfMovies = ref(0)
  const moviesStillLoading = ref(true)
  const allMoviesShowing = ref(true)
  const searchOngoing = ref(false)
  const overlay = ref(false)
  const snackbar = ref(false)
  const movies = ref([])
  const allMovies = ref([])
  const pagination = ref({
    descending: [true],
    sortBy: ['Title'],
    rowsPerPage: 10,
    page: 1,
    totalItems: movies.value.length
  })

  /* We inject a key called favourite on the response object.
  * This key is the one that distinguishes favourites and non-favorites */
  const favouriteMovies = computed(() => movies.value.filter((movie: MovieObjectType) => movie.favourite))
  const favouriteMovieCount = computed(() => favouriteMovies.value.length)

  /* We also use the computed property to display items on the table because we can filter by title.
  * If the search box is empty, then all results will be shown, otherwise the filter functionality will
  * kick in */
  const filteredItems = computed(() => filterItems())

  /* Our interest right not is the title */
  const filterItems = () => {
    return movies.value.filter((item: MovieObjectType) => {
      const Title = item.Title.toLowerCase().includes(search.value.toLowerCase())
      return (Title)
    })
  }

  const paginate = () => {
    /* This function keeps being called immediately a person has finished searching.
    *  Hence the need to set a variable while searching so as to prevent resetting the
    * search results. It means, therefore, that the api search can go on without the results
    * being reset */
    if (!searchOngoing.value) {
      fetchMovies(pagination.value.page, '')
    }
  }

  /* The previous filter function processess items displayed on the table. However, this function is
  * responsible for handling requests to the json mock api. Once a user has entered text on the search
  * box, searching on the api begins in 1 second if not interrupted */
  const searchByTitle = async () => {
    searchOngoing.value = true
    overlay.value = true
    await fetchMovies(pagination.value.page, search.value)
    setTimeout(() => {
      searchOngoing.value = false
    }, 2000)
  }

  /* Helps to disable searching for at least a second before proceeding. Helps to allow use to type first,
  * while also reducing the total number of requests, hence reduced resources */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = <F extends ((...args: any) => any)>(func: F, waitFor: number) => {
    let timeout = 0
    const debounced = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(), waitFor)
    }

    return debounced as (...args: Parameters<F>) => ReturnType<F>
  }

  const processSearch = debounce<typeof searchByTitle>(searchByTitle, 1000)

  const chooseMoviesToShow = (showAll: boolean) => {
    if ((!showAll && favouriteMovieCount.value > 0) || showAll) {
      movies.value = showAll ? allMovies.value : favouriteMovies.value
      allMoviesShowing.value = showAll
    } else {
      snackbar.value = true
    }
  }

  const fetchMovies = (page: number, title: string) => {
    MovieDataService.getByPage(page, title)
      .then((response: ResponseDataType) => {
        allMovies.value = response.data.data.map((item: MovieObjectType) => {
          item.favourite = false
          return item
        })
        chooseMoviesToShow(true)
        totalNumberOfMovies.value = response.data.total
        moviesStillLoading.value = false
        overlay.value = false
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  return {
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
    searchOngoing,
    snackbar,
    totalNumberOfMovies,
    fetchMovies,
    chooseMoviesToShow,
    paginate,
    processSearch
  }
}
