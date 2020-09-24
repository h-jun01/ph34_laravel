import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ArticleShow = ({ ...props }) => {
    const [article, setAticle] = useState({});

    useEffect(() => {
        const articleId = props.match.params.id;
        axios.get(`/api/article/${articleId}`).then((response) => {
            setAticle(response.data);
        });
    }, []);

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            タイトル：{article.title}
                        </div>
                        <div className="card-body">
                            <p>{article.content}</p>
                            <Link className="btn btn-primary" to={`/`}>
                                戻る
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleShow;
