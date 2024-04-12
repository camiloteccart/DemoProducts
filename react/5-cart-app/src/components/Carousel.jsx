export const Carousel = () => {
    return (<>
    <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="/img/c1.jpg" focusable="false" className="d-block w-100"/>
                        </div>
                        <div className="carousel-item">
                            <img src="/img/c2.jpg" focusable="false" className="d-block w-100"/>
                        </div>
                        <div className="carousel-item">
                            <img src="/img/c3.jpg" focusable="false" className="d-block w-100"/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
    </>)
}