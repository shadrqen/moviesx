import http from '@/http-common'

class MovieDataService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getByPage (page: number, title: string): Promise<any> {
    const baseUrl = `/movies?page=${page}`
    return http.get(title !== '' ? baseUrl.concat(`&Title=${title}`) : baseUrl)
  }
}

export default new MovieDataService()
