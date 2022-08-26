export interface available_on_type {
    link: string,
    name: string,
    price: string,
    thumbnail: string
}

export interface results {
    id: number,
    original_title: string,
    original_language: string,
    overview: string,
    poster_path: string,
    release_date: string,
    backdrop_path: string
}

export interface backdrop {
    file_path: string,
}

export interface posters {
    file_path: string
}

export interface get_movies_images {
    backdrops: Array<backdrop>,
    posters: Array<posters>
}

export interface InitialState {
    loading : boolean
    available_on : Array<available_on_type>
    get_movies_info : Array<results>
    get_movies_images : get_movies_images
}

export const initialState : InitialState = {
    loading : false,
    available_on : [],
    get_movies_info : [],
    get_movies_images : {
        backdrops: [],
        posters: []
    }
}