// js/data.js

// --- CẤU HÌNH API ---
const API_KEY = "ae2da519"; 
const API_URL = "https://www.omdbapi.com/";

// --- DANH SÁCH SERVER ---
const MOVIE_SERVERS = [
    { id: 1, name: "Server VIP (VidSrc)", url: "https://vidsrc.xyz/embed/movie" },
    { id: 2, name: "Server Dự Phòng (AutoEmbed)", url: "https://player.autoembed.cc/embed/movie" }
];

// --- DANH SÁCH PHIM BOM TẤN (Thêm phim mới vào đây) ---
const BLOCKBUSTER_POOL = [
    "Harry Potter and the Sorcerer's Stone",
    "Harry Potter and the Chamber of Secrets",
    "Harry Potter and the Prisoner of Azkaban",
    "Harry Potter and the Goblet of Fire",
    "Harry Potter and the Order of the Phoenix",
    "Harry Potter and the Half-Blood Prince",
    "Harry Potter and the Deathly Hallows: Part 1",
    "Harry Potter and the Deathly Hallows: Part 2",
    "Dune: Part Two", "Oppenheimer", "Avatar: The Way of Water", "The Batman",
    "Top Gun: Maverick", "Avengers: Endgame",
    "Interstellar", "Inception", "The Dark Knight", "Blade Runner 2049",
    "Godzilla x Kong: The New Empire", "Deadpool & Wolverine", "Civil War",
    "Furiosa: A Mad Max Saga", "Kingdom of the Planet of the Apes",
    "Everything Everywhere All At Once", "Joker", "Guardians of the Galaxy Vol. 3", 
    "Cyberpunk: Edgerunners", "Arcane"
];

// --- MAP TRAILER YOUTUBE ---
const TRAILER_MAP = {
    "Harry Potter and the Sorcerer's Stone": "VyHV0BRtdxo",
    "Harry Potter and the Chamber of Secrets": "1bq0qff4iF8",
    "Harry Potter and the Prisoner of Azkaban": "1ZdlAg3j8nI",
    "Harry Potter and the Goblet of Fire": "3EGojp4Hh6I",
    "Harry Potter and the Order of the Phoenix": "LLAaW1EgyY8",
    "Harry Potter and the Half-Blood Prince": "tAiy66Xrsz4",
    "Harry Potter and the Deathly Hallows: Part 1": "MxqsmsA8y5k",
    "Harry Potter and the Deathly Hallows: Part 2": "mObK5XD8udk",
    "Dune: Part Two": "Way9Dexny3w",
    "Oppenheimer": "uYPbbksJxIg",
    "Avatar: The Way of Water": "a6VVrAZUnsc",
    "The Batman": "mqqft2x_Aa4",
    "Top Gun: Maverick": "giXco2jaZ_4",
    "Avengers: Endgame": "TcMBFSGVi1c",
    "Interstellar": "zSWdZVtXT7E",
    "Inception": "YoHD9XEInc0",
    "The Dark Knight": "EXeTwQWrcwY",
    "Blade Runner 2049": "gCcx85zbxz4",
    "Godzilla x Kong: The New Empire": "lV1OOlGwExM",
    "Deadpool & Wolverine": "DFTJTlri4MI",
    "Civil War": "aDyQxtg0V2w",
    "Furiosa: A Mad Max Saga": "XJMuhwVlca4",
    "Kingdom of the Planet of the Apes": "XtFI7SNtVpY",
    "Joker": "zAGVQLHvwOY",
    "Guardians of the Galaxy Vol. 3": "u3V5KDWgQqE",
    "Cyberpunk: Edgerunners": "JtqIas3bYhg",
    "Arcane": "fXmAurh012s",
    "Everything Everywhere All at Once": "wxN1T1uxQ2g",
    "Spider-Man: Across the Spider-Verse": "shW9i6k8cB0"
};
