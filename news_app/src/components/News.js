import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static deafultProps = {
        pageSize: 8,
        category: 'general',
        // apiKey: 'c7e6d2c87a834f50aa5651461ba53938',
    }

    static propTypes = {
        pageSize: PropTypes.number,
        category: PropTypes.string,
        // apiKey: PropTypes.string,
    }

    constructor(props) {
        super(props);
        // console.log("Hello I am a constructor from News Component");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            country: "in",
            totalResults: 0,
        }
        document.title = `${(this.props.category).charAt(0).toUpperCase() + (this.props.category).slice(1)} - GlobalNews`;
    }

    async updateCountry(country) {
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
            country: country,
        })
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);

    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        // console.log("Previous");
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        // console.log("Next");
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    handleCountryind = async () => {
        const country1 = "in";
        this.setState({ country: "in" });
        this.updateCountry(country1);
    }

    handleCountryus = async () => {
        const country2 = "us";
        this.setState({ country: "us" });
        this.updateCountry(country2);
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })
    };

    render() {
        console.log("render");
        let str = this.props.category;
        let str2 = str.charAt(0).toUpperCase() + str.slice(1);
        return (
            <>
                <h2 className="text-center">GlobalNews - Top Headlines - {str2}</h2>
                <div className="dropdown my-3">
                    <button className="btn btn-secondary dropdown-toggle mx-5" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Edition
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><button className="dropdown-item" onClick={this.handleCountryind}>INDIA</button></li>
                        <li><button className="dropdown-item" onClick={this.handleCountryus}>USA</button></li>
                    </ul>
                </div>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >


                    <div className="container">


                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"} Url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>


                    </div>
                </InfiniteScroll>
                {/* <div className="d-flex justify-content-between my-5">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                </div> */}

            </>
        )
    }
}

export default News
