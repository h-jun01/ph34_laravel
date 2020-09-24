import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";

const ArticleCreate = ({ ...props }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [alert, setAlert] = useState(null);
    const [errors] = useState([]);

    const handleFieldTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleFieldContentChange = (event) => {
        setContent(event.target.value);
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
                投稿が完了しました。
            </SweetAlert>
        );
        setAlert(getAlert());
    };

    const onSuccess = () => {
        props.history.push("/");
    };

    const hideAlert = () => {
        setAlert(null);
    };

    const handleCreateNewArticle = (event) => {
        event.preventDefault();

        const article = { title, content };

        axios.post("/api/article/store", article).then((response) => {
            const msg = response.data.success;
            if (msg == true) {
                return goToHome();
            }
        });
    };

    const hasErrorFor = (field) => {
        return !!errors[field];
    };

    const renderErrorFor = (field) => {
        if (hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{errors[field][0]}</strong>
                </span>
            );
        }
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">新規作成</div>
                        <div className="card-body">
                            <form onSubmit={handleCreateNewArticle}>
                                <div className="form-group">
                                    <label htmlFor="title">タイトル</label>
                                    <input
                                        id="title"
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("title")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        name="title"
                                        value={title}
                                        onChange={handleFieldTitleChange}
                                    />
                                    {renderErrorFor("title")}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content">内容</label>
                                    <textarea
                                        id="content"
                                        className={`form-control ${
                                            hasErrorFor("content")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        name="content"
                                        rows="10"
                                        value={content}
                                        onChange={handleFieldContentChange}
                                    />
                                    {renderErrorFor("content")}
                                </div>
                                <Link className="btn btn-secondary" to={`/`}>
                                    戻る
                                </Link>
                                &nbsp; &nbsp;
                                <button className="btn btn-primary">
                                    新規作成
                                </button>
                                {alert}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleCreate;
