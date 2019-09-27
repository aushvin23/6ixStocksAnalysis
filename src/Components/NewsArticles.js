import React, { Component } from 'react';

class NewsArticle extends Component {

    render() {
        return (
            <div className = "articleRightBox">
                    <p><strong>{this.props.symbol} - Today's News</strong></p>
                    {
                        this.props.newsArticles.map((news, index) => {
                            return (
                                <li key={index}>

                                    <img src={`${news.image_url}`} alt="" className ="newsImg"/>

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