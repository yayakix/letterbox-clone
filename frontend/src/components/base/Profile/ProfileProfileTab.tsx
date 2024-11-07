
const ProfileProfileTab = (props: any) => {
    const { likedFilms } = props;
    return (
        <div className="text-slate-200 ">
            <div className="text-sm text-slate-400 font-bold">FAVORITE FILMS</div>
            <div className="border-b border-slate-700 my-2"></div>
            <div className="text-sm text-slate-400 mb-10">Don’t forget to select your
                <span className="text-slate-200"> favorite films</span>!
            </div>

            {/* show favorite films */}
            <div className="text-sm text-slate-400 ">Recent likes</div>

            <div className="grid grid-cols-4 mt-2">
                {likedFilms.map((film: any) => (
                    <div key={film.id} className="w-40 h-56 border border-slate-700 rounded-lg">
                        <a href={`/movie/${film.id}`}>
                            <img src={film.imageUrl} alt={film.title} className="w-full h-full object-cover rounded-lg" />
                        </a>
                    </div>
                ))}
                {/* show empty boxes if there are no films */}
                {likedFilms.length === 0 && (
                    <>
                        <div className="w-40 h-56 border border-slate-700 rounded-lg"></div>
                        <div className="w-40 h-56 border border-slate-700 rounded-lg"></div>
                        <div className="w-40 h-56 border border-slate-700 rounded-lg"></div>
                    </>
                )}

            </div>
        </div>
    )
}
export default ProfileProfileTab;