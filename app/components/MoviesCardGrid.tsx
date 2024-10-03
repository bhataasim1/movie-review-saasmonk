import MovieCard from './MovieCard'

export type MovieWithAvgRating = {
  id: string
  name: string
  releaseDate: string
  averageRating: number | null
  createdAt: Date
  updatedAt: Date
}

interface MovieCardGridProps {
  movies: MovieWithAvgRating[]
}

export default function MovieCardGrid({ movies }: MovieCardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  )
}