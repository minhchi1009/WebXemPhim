// js/app.js

const { useState, useEffect, useRef } = React;

// --- 1. ICON AN TOÀN & KHAI BÁO ---
const Icons = window.lucideReact || {};
const SafeIcon = (iconName, fallbackChar) => {
    const IconComp = Icons[iconName];
    return IconComp ? IconComp : () => <span className="font-bold px-2 text-lg">{fallbackChar}</span>;
};

// Khai báo Icon
const Play = SafeIcon('Play', '');
const Info = SafeIcon('Info', '');
const Search = SafeIcon('Search', '🔍');
const Bell = SafeIcon('Bell', '🔔');
const X = SafeIcon('X', '✕');
const ChevronRight = SafeIcon('ChevronRight', '>');
const ChevronLeft = SafeIcon('ChevronLeft', '<');
const Film = SafeIcon('Film', '');
const Server = SafeIcon('Server', '🌐');
const User = SafeIcon('User', '👤');
const Loader2 = SafeIcon('Loader2', '⏳');
const Star = SafeIcon('Star', '⭐');
const Plus = SafeIcon('Plus', '+');
const ThumbsUp = SafeIcon('ThumbsUp', '👍');
const Volume2 = SafeIcon('Volume2', '🔊');
const Maximize = SafeIcon('Maximize', '⛶');

// --- HELPER FUNCTION ---
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// --- COMPONENTS ---

// 1. NAVIGATION
const Navigation = ({ isScrolled, onLoginClick, onSearch }) => {
    const [username, setUsername] = useState(null);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("nebula_user");
        if (storedUser) setUsername(storedUser);
    }, []);

    const handleLogout = () => {
        if (confirm("Bạn muốn đăng xuất?")) {
            localStorage.removeItem("nebula_user");
            window.location.reload();
        }
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        
        if (val.length > 0) {
            const filtered = BLOCKBUSTER_POOL.filter(title => 
                title.toLowerCase().includes(val.toLowerCase())
            );
            setResults(filtered);
            setIsSearching(true);
        } else {
            setResults([]);
            setIsSearching(false);
        }
    };

    const handleSelectMovie = (title) => {
        setQuery(""); 
        setResults([]);
        setIsSearching(false);
        onSearch(title); 
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0f1020]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <h1 className="text-2xl font-black tracking-tighter cursor-pointer select-none group" onClick={() => window.location.reload()}>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:bg-gradient-to-l transition-all duration-500">NEBULA</span>
                        <span className="text-white">STREAM</span>
                    </h1>
                    <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
                        <a href="#" className="hover:text-cyan-400 transition-colors">Trang chủ</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Phim bộ</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Phim lẻ</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Mới & Phổ biến</a>
                    </div>
                </div>

                <div className="flex items-center gap-5 text-gray-300">
                    <div className="relative group">
                        <div className={`hidden md:flex items-center bg-white/5 rounded-full px-3 py-1.5 backdrop-blur-sm border transition-all focus-within:border-cyan-500/50 ${isSearching ? 'border-cyan-500 bg-white/10' : 'border-white/5'}`}>
                            <Search size={18} className={`transition-colors ${isSearching ? "text-cyan-400" : "group-focus-within:text-cyan-400"}`} />
                            <input 
                                type="text" 
                                value={query}
                                onChange={handleInputChange}
                                placeholder="Tìm kiếm..." 
                                className="bg-transparent border-none outline-none text-sm ml-2 w-24 group-focus-within:w-48 transition-all duration-300 text-white placeholder-gray-500"
                            />
                            {query && (
                                <button onClick={() => {setQuery(''); setResults([]); setIsSearching(false);}} className="text-gray-400 hover:text-white ml-2">
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {results.length > 0 && (
                            <div className="absolute top-full right-0 mt-2 w-72 bg-[#181818] border border-white/10 rounded-lg shadow-2xl overflow-hidden animate-fade-in z-[60]">
                                <div className="text-xs text-gray-500 px-4 py-2 border-b border-white/5 bg-white/5">
                                    Gợi ý tìm kiếm
                                </div>
                                {results.map((title, index) => (
                                    <div 
                                        key={index} 
                                        onClick={() => handleSelectMovie(title)}
                                        className="px-4 py-3 hover:bg-cyan-500/20 hover:text-cyan-400 cursor-pointer transition-colors flex items-center gap-2 border-b border-white/5 last:border-0"
                                    >
                                        <Film size={14} className="opacity-50" />
                                        <span className="truncate text-sm font-medium">{title}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Bell size={20} className="cursor-pointer hover:text-white hover:scale-110 transition-transform" />
                    
                    {username ? (
                        <div className="flex items-center gap-3 group relative cursor-pointer" onClick={handleLogout} title="Bấm để đăng xuất">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-gray-400">Xin chào,</p>
                                <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 truncate max-w-[100px]">{username}</p>
                            </div>
                            <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 to-purple-600 shadow-lg shadow-purple-500/20 group-hover:shadow-cyan-400/40 transition-all">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} alt="User" className="rounded-full bg-black h-full w-full object-cover" />
                            </div>
                        </div>
                    ) : (
                        <div onClick={onLoginClick} className="w-9 h-9 rounded-full bg-white/10 p-[2px] cursor-pointer hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center group" title="Đăng nhập">
                            <User size={18} className="text-gray-400 group-hover:text-white" />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

// 2. HERO SECTION
const Hero = ({ movie, onPlayTrailer, onWatchMovie, onInfo }) => {
    if (!movie) return (
        <div className="h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
                <Loader2 size={48} className="text-cyan-500 animate-spin mx-auto" />
                <p className="text-cyan-400 font-bold tracking-widest animate-pulse">LOADING NEBULA...</p>
            </div>
        </div>
    );
    
    return (
        <div className="relative w-full h-[85vh] md:h-screen overflow-hidden">
            <div className="absolute inset-0">
                <img src={movie.image} alt="Hero Background" className="w-full h-full object-cover animate-pan-slow" onError={(e) => e.target.src='https://via.placeholder.com/1920x1080'} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c15] via-[#0b0c15]/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c15] via-[#0b0c15]/50 to-transparent"></div>
            </div>
            
            <div className="relative z-10 h-full flex items-center px-4 md:px-12 max-w-7xl mx-auto pt-20">
                <div className="max-w-2xl space-y-6 animate-fade-in-up">
                    <div className="flex items-center gap-3 text-cyan-400 font-semibold text-xs tracking-widest uppercase">
                        <span className="bg-cyan-500/20 px-2 py-1 rounded backdrop-blur-md border border-cyan-500/30">N E W</span>
                        <span>{movie.genre || "Action • Sci-Fi"}</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-2xl">{movie.title}</h1>
                    
                    <div className="flex items-center gap-4 text-gray-300 font-medium">
                        <span className="text-green-400 font-bold">{movie.match}</span>
                        <span>{movie.year}</span>
                        <span className="border border-gray-500 px-2 rounded text-xs py-0.5">{movie.rated}</span>
                        <span className="flex items-center gap-1"><Star size={14} className="fill-yellow-400 text-yellow-400"/> {movie.imdbRating || "9.0"}</span>
                    </div>
                    
                    <p className="text-gray-300 text-lg leading-relaxed line-clamp-3 md:line-clamp-none max-w-xl text-shadow-sm">{movie.description}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button onClick={onWatchMovie} className="group flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                            <span>Xem Ngay</span>
                        </button>
                        <button onClick={onPlayTrailer} className="flex items-center justify-center px-8 py-4 bg-white/10 text-white font-bold rounded-xl backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
                            <span>Trailer</span>
                        </button>
                        <button onClick={onInfo} className="flex items-center justify-center px-8 py-4 bg-white/10 text-white font-bold rounded-xl backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
                            <span>Thông Tin</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. MOVIE CARD & ROW
const MovieCard = ({ movie, onClick }) => (
    <div 
        onClick={() => onClick(movie)}
        className="relative group min-w-[200px] md:min-w-[280px] aspect-[16/9] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:z-20 hover:scale-110 shadow-lg hover:shadow-cyan-500/20"
    >
        <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:brightness-110" onError={(e) => e.target.src='https://via.placeholder.com/300x450'} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-white font-bold text-lg mb-1">{movie.title}</h4>
                <div className="flex items-center justify-between text-xs text-gray-300">
                    <span className="text-green-400 font-bold">{movie.match}</span>
                    <span>{movie.duration}</span>
                </div>
            </div>
        </div>
    </div>
);

const MovieRow = ({ title, movies, onMovieClick }) => {
    const rowRef = useRef(null);
    const scroll = (direction) => {
        if (rowRef.current) {
            const scrollAmount = direction === 'left' ? -window.innerWidth / 2 : window.innerWidth / 2;
            rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
    
    if (!movies || movies.length === 0) return null;
    
    return (
        <div className="py-8 space-y-4 group">
            <div className="px-4 md:px-12 flex items-center justify-between">
                <h3 className="text-xl md:text-2xl font-bold text-white/90 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                    {title} <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"/>
                </h3>
            </div>
            <div className="relative group/row">
                <button onClick={() => scroll('left')} className="absolute left-0 top-0 bottom-0 w-12 bg-black/50 backdrop-blur-sm z-30 opacity-0 group-hover/row:opacity-100 transition-opacity hidden md:flex items-center justify-center hover:bg-black/70 text-white">
                    <ChevronRight className="rotate-180" size={32} />
                </button>
                <div ref={rowRef} className="flex gap-4 overflow-x-auto px-4 md:px-12 pb-8 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
                    ))}
                </div>
                <button onClick={() => scroll('right')} className="absolute right-0 top-0 bottom-0 w-12 bg-black/50 backdrop-blur-sm z-30 opacity-0 group-hover/row:opacity-100 transition-opacity hidden md:flex items-center justify-center hover:bg-black/70 text-white">
                    <ChevronRight size={32} />
                </button>
            </div>
        </div>
    );
};

// 4. MOVIE DETAIL MODAL
const MovieDetailModal = ({ movie, onClose, onPlayTrailer, onWatchMovie }) => {
    if (!movie) return null;
    
    const trailerId = TRAILER_MAP[movie.title];
    const videoSrc = trailerId 
        ? `https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`
        : `https://www.youtube.com/embed?listType=search&list=trailer+${encodeURIComponent(movie.title)}&autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`;

    const handleContentClick = (e) => e.stopPropagation();

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"></div>
            
            <div className="relative w-full max-w-4xl bg-[#181818] rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto scrollbar-hide ring-1 ring-white/10" onClick={handleContentClick}>
                <button onClick={onClose} className="absolute top-4 right-4 z-20 bg-[#181818] p-2 rounded-full hover:bg-white/20 transition text-white">
                    <X size={24} />
                </button>

                <div className="relative aspect-video w-full">
                    <iframe 
                        src={videoSrc}
                        title={movie.title}
                        className="w-full h-full object-cover"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        frameBorder="0"
                    ></iframe>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent pointer-events-none"></div>
                    
                    <div className="absolute bottom-8 left-8 right-8">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">{movie.title}</h2>
                        
                        <div className="flex items-center gap-4">
                            <button onClick={() => { onWatchMovie(movie); onClose(); }} className="flex items-center justify-center px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition transform hover:scale-105">
                                Phát
                            </button>
                            <button onClick={() => { onPlayTrailer(movie); onClose(); }} className="flex items-center justify-center px-4 py-3 bg-gray-600/60 border border-gray-500 text-white font-bold rounded hover:bg-gray-600/80 transition">
                                Trailer
                            </button>
                            <button className="p-3 rounded-full border border-gray-500 bg-gray-600/60 hover:bg-gray-600/80 transition">
                                <Plus size={20} />
                            </button>
                            <button className="p-3 rounded-full border border-gray-500 bg-gray-600/60 hover:bg-gray-600/80 transition">
                                <ThumbsUp size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center gap-4 text-sm font-bold flex-wrap">
                            <span className="text-green-400 font-extrabold">{movie.match}</span>
                            <span className="text-gray-400">{movie.year}</span>
                            <span className="border border-gray-500 px-1.5 py-0.5 text-xs rounded-sm bg-white/10">{movie.rated}</span>
                            <span className="text-gray-400">{movie.duration}</span>
                            <span className="border border-white/40 px-1 text-[10px] rounded flex items-center">HD</span>
                        </div>
                        
                        <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                            {movie.description}
                        </p>
                    </div>

                    <div className="text-sm space-y-4">
                        <div>
                            <span className="text-gray-500 block mb-1">Diễn viên:</span>
                            <span className="text-gray-300">{movie.actors || "N/A"}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 block mb-1">Đạo diễn:</span>
                            <span className="text-gray-300">{movie.director || "N/A"}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 block mb-1">Thể loại:</span>
                            <span className="text-gray-300">{movie.genre || "N/A"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 5. VIDEO PLAYER
const VideoPlayer = ({ onClose, movie, mode }) => {
    const [currentServer, setCurrentServer] = useState(1);
    
    let videoSrc = "";
    let playerTitle = "";

    if (mode === 'trailer') {
        const youtubeId = TRAILER_MAP[movie.title] || ""; 
        videoSrc = youtubeId 
            ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&rel=0`
            : `https://www.youtube.com/embed?listType=search&list=trailer+${encodeURIComponent(movie.title)}`;
        playerTitle = `${movie.title} - Trailer`;
    } else {
        const serverConfig = MOVIE_SERVERS.find(s => s.id === currentServer) || MOVIE_SERVERS[0];
        videoSrc = `${serverConfig.url}/${movie.id}`; 
        playerTitle = `Đang xem: ${movie.title}`;
    }

    return (
        <div className="fixed inset-0 z-[100] bg-[#050505] animate-fade-in flex flex-col">
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex flex-col">
                    <h2 className="text-white text-2xl font-bold">{playerTitle}</h2>
                    {mode === 'movie' && <span className="text-gray-300 text-sm">Server {currentServer}</span>}
                </div>
                <button onClick={onClose} className="text-white/70 hover:text-white bg-black/50 p-2 rounded-full backdrop-blur-md border border-white/10 transition-all hover:bg-red-500/20 hover:border-red-500/50">
                    <X size={28} />
                </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center bg-[#050505] relative">
                <iframe 
                    key={videoSrc}
                    src={videoSrc}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    frameBorder="0"
                ></iframe>
            </div>

            {mode === 'movie' && (
                <div className="max-w-7xl mx-auto w-full p-6 md:p-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Server size={20} className="text-cyan-400"/> Chọn Nguồn Phát
                                </h3>
                                <p className="text-gray-400 text-sm mt-1">Nếu Server 1 lỗi, hãy thử Server 2.</p>
                            </div>
                            
                            <div className="flex gap-2">
                                {MOVIE_SERVERS.map(server => (
                                    <button
                                        key={server.id}
                                        onClick={() => setCurrentServer(server.id)}
                                        className={`px-4 py-2 rounded font-bold text-sm transition-all flex items-center gap-2 border ${
                                            currentServer === server.id 
                                            ? 'bg-cyan-500 border-cyan-500 text-black' 
                                            : 'bg-black/30 border-white/10 text-white hover:bg-white/10'
                                        }`}
                                    >
                                        <Server size={16} />
                                        {server.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// 6. FOOTER
const Footer = () => (
    <footer className="bg-[#050505] text-gray-400 py-16 px-4 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div>
                    <h1 className="text-2xl font-black tracking-tighter text-white mb-6">
                        NEBULA<span className="text-cyan-400">.</span>
                    </h1>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-all cursor-pointer">
                            <Star size={18}/>
                        </div>
                        <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center hover:bg-purple-500/20 hover:text-purple-400 transition-all cursor-pointer">
                            <ThumbsUp size={18}/>
                        </div>
                    </div>
                </div>
                
                {[1, 2, 3].map((col) => (
                    <div key={col} className="space-y-4">
                        <h4 className="text-white font-bold uppercase text-sm tracking-wider mb-2">Liên Kết</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Trung tâm hỗ trợ</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Điều khoản sử dụng</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Quyền riêng tư</li>
                            <li className="hover:text-cyan-400 cursor-pointer transition-colors">Liên hệ</li>
                        </ul>
                    </div>
                ))}
            </div>
            
            <div className="pt-8 border-t border-white/5 text-center text-xs text-gray-600">
                © 2025 Nebula Stream.
            </div>
        </div>
    </footer>
);

// 7. MAIN APP
const App = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [heroMovie, setHeroMovie] = useState(null);
    const [trendingNow, setTrendingNow] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [detailMovie, setDetailMovie] = useState(null);
    const [playingMovie, setPlayingMovie] = useState(null);
    const [playerMode, setPlayerMode] = useState('trailer');
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            const shuffled = shuffleArray([...BLOCKBUSTER_POOL]);
            const heroTitle = shuffled[0]; 
            const trendingTitles = shuffled.slice(1, 9);
            const topTitles = shuffled.slice(9, 17);

            const getDetails = async (titles) => {
                const promises = titles.map(t => fetch(`${API_URL}?t=${encodeURIComponent(t)}&apikey=${API_KEY}`).then(res => res.json()));
                const data = await Promise.all(promises);
                return data.filter(item => item.Response === "True").map(item => ({
                    id: item.imdbID,
                    title: item.Title,
                    description: item.Plot,
                    image: (item.Poster && item.Poster !== "N/A") ? item.Poster : "https://via.placeholder.com/300x450",
                    year: item.Year,
                    imdbRating: item.imdbRating,
                    match: item.imdbRating !== "N/A" ? Math.round(parseFloat(item.imdbRating) * 10) + "%" : "95%",
                    genre: item.Genre,
                    rated: item.Rated,
                    duration: item.Runtime,
                    actors: item.Actors,
                    director: item.Director
                }));
            };

            try {
                const [heroData, trendingData, topData] = await Promise.all([
                    getDetails([heroTitle]),
                    getDetails(trendingTitles),
                    getDetails(topTitles)
                ]);

                if (heroData.length > 0) setHeroMovie(heroData[0]);
                setTrendingNow(trendingData);
                setTopRated(topData);
                setActionMovies([...trendingData].reverse());
            } catch (err) {
                console.error("Lỗi tải phim:", err);
            }
        };
        fetchMovies();
    }, []);

    const handleSearchMovie = async (title) => {
        setIsLoadingSearch(true);
        try {
            const res = await fetch(`${API_URL}?t=${encodeURIComponent(title)}&apikey=${API_KEY}`);
            const data = await res.json();
            
            if (data.Response === "True") {
                const movieData = {
                    id: data.imdbID,
                    title: data.Title,
                    description: data.Plot,
                    image: (data.Poster && data.Poster !== "N/A") ? data.Poster : "https://via.placeholder.com/300x450",
                    year: data.Year,
                    imdbRating: data.imdbRating,
                    match: data.imdbRating !== "N/A" ? Math.round(parseFloat(data.imdbRating) * 10) + "%" : "90%",
                    genre: data.Genre,
                    rated: data.Rated,
                    duration: data.Runtime,
                    actors: data.Actors,
                    director: data.Director
                };
                setDetailMovie(movieData); 
            } else {
                alert("Không tìm thấy thông tin phim này!");
            }
        } catch (error) {
            console.error("Lỗi tìm kiếm:", error);
            alert("Lỗi kết nối server!");
        } finally {
            setIsLoadingSearch(false);
        }
    };

    const openDetail = (movie) => setDetailMovie(movie);
    const closeDetail = () => setDetailMovie(null);
    const openPlayer = (movie, mode) => {
        setDetailMovie(null);
        setPlayerMode(mode);
        setPlayingMovie(movie);
    };

    return (
        <div className="min-h-screen bg-[#0b0c15] text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
            <Navigation 
                isScrolled={isScrolled} 
                onLoginClick={() => window.location.href = 'login.html'} 
                onSearch={handleSearchMovie}
            />
            
            <main>
                <Hero 
                    movie={heroMovie} 
                    onPlayTrailer={() => openPlayer(heroMovie, 'trailer')} 
                    onWatchMovie={() => openPlayer(heroMovie, 'movie')} 
                    onInfo={() => openDetail(heroMovie)} 
                />
                
                <div className="relative z-20 pt-16 md:pt-24 pb-20 bg-gradient-to-b from-transparent via-[#0b0c15] to-[#0b0c15]">
                    <MovieRow title="Hiện đang thịnh hành" movies={trendingNow} onMovieClick={openDetail} />
                    <MovieRow title="Tuyển tập Top Rated" movies={topRated} onMovieClick={openDetail} />
                    <MovieRow title="Phim Hành Động Bom Tấn" movies={actionMovies} onMovieClick={openDetail} />
                </div>
            </main>
            
            <Footer />

            {isLoadingSearch && (
                <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="animate-spin text-cyan-500">
                        <Loader2 size={48} />
                    </div>
                </div>
            )}

            {detailMovie && (
                <MovieDetailModal 
                    movie={detailMovie} 
                    onClose={closeDetail} 
                    onPlayTrailer={() => openPlayer(detailMovie, 'trailer')} 
                    onWatchMovie={() => openPlayer(detailMovie, 'movie')} 
                />
            )}
            
            {playingMovie && (
                <VideoPlayer 
                    movie={playingMovie} 
                    mode={playerMode} 
                    onClose={() => setPlayingMovie(null)} 
                />
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
