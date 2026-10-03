import searchIcon from "../assets/search.png"
import rightArrowIcon from "../assets/right-arrow.png"

function Hero() {
    return (
        <section >
            <div className="relative mx-auto flex min-h-155 sm:min-h-130 items-center overflow-hidden bg-light-surface dark:bg-dark-surface">
                {/* Background Image */}
                <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-[position:65%_center] sm:bg-center bg-no-repeat" />

                {/* Light overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-white/20 dark:hidden" />

                {/* Dark overlay */}
                <div className="absolute inset-0 hidden bg-linear-to-r from-dark-bg via-dark-bg/80 to-dark-bg/10 dark:block" />

                {/* Content */}
                <div className="relative z-10 w-full px-5 py-10 sm:px-10 sm:py-14 lg:max-w-3xl lg:px-14">

                    <p className="mb-4 text-sm flex gap-4 font-bold uppercase tracking-[0.15em] text-movie-primary">
                        <span>Explore</span>
                        <span>Discover</span>
                        <span>Save</span>
                    </p>

                    <h1 className="max-w-2xl text-3xl font-extrabold leading-[1.05] text-light-text sm:text-5xl lg:text-6xl dark:text-dark-text">
                        Discover Your
                        <span className="block text-movie-primary">
                            Next Movie
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-7 text-light-muted sm:text-lg dark:text-dark-muted">
                        Search, explore, and discover movies you'll love.
                        Find your next favorite film in seconds.
                    </p>

                    {/* Search */}
                    <div className="mt-8 flex max-w-2xl flex-col sm:flex-row overflow-hidden rounded-2xl border border-light-border bg-light-surface/95 shadow-lg backdrop-blur-sm dark:border-dark-border dark:bg-dark-surface/90">
                        <div className="flex min-w-0 flex-1 items-center">

                            <span className="pl-4 text-light-muted dark:text-dark-muted">
                                <img src={searchIcon} alt="searchIcon" className="dark:invert h-6 w-6" />
                            </span>

                            <input type="text" placeholder="Search movies..." className="min-w-0 flex-1 bg-transparent px-3 py-4 text-light-text outline-none placeholder:text-light-muted dark:text-dark-text dark:placeholder:text-dark-muted" />
                        </div>

                        <button className="cursor-pointer bg-movie-primary w-full px-6 py-3 sm:w-auto sm:py-4 font-semibold text-white transition duration-200 hover:opacity-90 sm:px-8">
                            Search
                        </button>
                    </div>

                    {/* CTA */}
                    <button className="group mt-4 cursor-pointer rounded-xl border border-light-border bg-light-surface/80 px-6 py-3 text-sm font-semibold text-light-text transition duration-200 hover:border-movie-primary hover:text-movie-primary dark:border-dark-border dark:bg-dark-surface/60 dark:text-dark-text">
                        Explore Movies <img src={rightArrowIcon} className="dark:invert h-6 w-6 inline transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;