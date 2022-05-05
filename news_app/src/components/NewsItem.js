import React, { Component } from 'react'


export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, Url, author, date, source } = this.props;
        let d = new Date(date);
        // let publish_date = d.toUTCString();
        let indiaTime = d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        return (
            <div className="my-3">
                <div className="card text-center">
                    <div style={
                        {
                            display: 'flex',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            right: '0',
                        }
                    }>

                        <span className="badge rounded-pill bg-danger">
                            {source}
                        </span>
                    </div>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <hr />
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {indiaTime}</small></p>
                        <a href={Url} type="submit" className="btn btn-sm btn-primary" target="_blank" rel="noreferrer" >Read More</a>
                    </div>
                </div>
            </div >
        )
    }
}

export default NewsItem
