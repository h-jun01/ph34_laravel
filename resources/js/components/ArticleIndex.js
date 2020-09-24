import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";

const ArticleIndex = () => {
    const [articles, setArticles] = useState([]);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        axios.get("/api/articles").then((response) => {
            setArticles(response.data);
        });
    }, []);

    const hideAlert = () => {
        setAlert(null);
    };

    const confirmDelete = (id) => {
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="削除"
                cancelBtnText="キャンセル"
                confirmBtnBsStyle="default"
                cancelBtnBsStyle="danger"
                title="削除しますか？"
                onConfirm={() => deleteItem(id)}
                onCancel={() => hideAlert()}
                focusCancelBtn
            >
                削除した記事を元に戻すことは出来ません。
            </SweetAlert>
        );
        setAlert(getAlert());
    };

    const deleteItem = (id) => {
        axios.delete(`/api/article/delete/${id}`).then((response) => {
            const msg = response.data.success;
            if (msg == true) {
                hideAlert();
                goToHome();
            }
        });
    };

    const goToHome = () => {
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => onSuccess()}
                onCancel={hideAlert()}
                timeout={2000}
                confirmBtnText="OK"
            >
                削除が完了しました。
            </SweetAlert>
        );
        setAlert(getAlert());
    };

    const onSuccess = () => {
        axios.get("/api/articles").then((response) => {
            setArticles(response.data);
        });
        hideAlert();
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">記事一覧</div>
                        <div className="card-body">
                            <Link
                                className="btn btn-primary btn-sm mb-3"
                                to="/create"
                            >
                                新規作成
                            </Link>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th
                                                width="50"
                                                className="text-center"
                                            >
                                                No
                                            </th>
                                            <th>タイトル</th>
                                            <th
                                                width="200"
                                                className="text-center"
                                            >
                                                アクション
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {articles.map((article, i) => (
                                            <tr key={i}>
                                                <td
                                                    width="50"
                                                    className="text-center"
                                                >
                                                    {i + 1}
                                                </td>
                                                <td>{article.title}</td>
                                                <td
                                                    width="200"
                                                    className="text-center"
                                                >
                                                    <div className="btn-group">
                                                        <Link
                                                            className="btn btn-primary"
                                                            to={`/article/${article.id}`}
                                                        >
                                                            詳細
                                                        </Link>
                                                        <Link
                                                            className="btn btn-success"
                                                            to={`/article/edit/${article.id}`}
                                                        >
                                                            編集
                                                        </Link>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() =>
                                                                confirmDelete(
                                                                    article.id
                                                                )
                                                            }
                                                        >
                                                            削除
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {alert}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleIndex;
