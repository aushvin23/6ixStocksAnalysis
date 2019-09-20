import React, { Component } from 'react';

class NewsArticle extends Component {

    render() {
        return (
            <div>
                    <h2>{this.props.symbol} - Today's News</h2>
                    {
                        this.props.newsArticles.map((news, index) => {
                            return (
                                <li key={index}>

                                    <img src={`${news.image_url}`} alt="" />

                                    <div className="articleInfo">
                                        <h3>{news.source_name}: {news.title}</h3>
                                        <p>{news.date}</p>
                                        <p>{news.source_name}</p>
                                        <p>{news.news_url}</p>

                                        <p>{news.text}</p>
                                    </div>

                                </li>
                            )
                        })
                    }
            </div>
        )
    }
}

export default NewsArticle;