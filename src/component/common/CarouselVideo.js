
const CarouselVideo = () => {
    const videosList = [
        { id: 1, url: "https://res.cloudinary.com/chris101/video/upload/v1645684663/video_3.mp4" },
        { id: 2, url: "https://res.cloudinary.com/chris101/video/upload/v1645684663/video_3.mp4" }
    ];

    return (
        <div className="carousel   h-full w-full">
            <> {videosList.map((i, index) => {
                return (
                    <>

                        <div id={'slide' + i.id} className="carousel-item flex justify-center relative h-[200px] md:h-auto xl:h-auto w-full ">
                            {/* <video width="320" height="240" controls>
                                <source src={i.url} type="video/mp4"></source>
                            </video> */}
                            <iframe allowFullScreen frameborder="0" class="w-full h-full  bg-red-300 bottom-0 right-0 left-0 top-0 aspect-video hover:aspect-square"
                                src={i.url}>
                            </iframe>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href={'#slide' + (i.id - 1)} className="btn btn-circle">❮</a>
                                <a href={'#slide2'} className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </>
                )
            })}
            </>


        </div>
    );
}
export default CarouselVideo;