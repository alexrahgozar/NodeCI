// BlogNew shows BlogForm and BlogFormReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import BlogForm from "./BlogForm";
import BlogFormReview from "./BlogFormReview";

class BlogNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <BlogFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <BlogForm onBlogSubmit={() => this.setState({ showFormReview: true })} />
    );
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#dfe3ee",
          padding: "25px",
          border: "25px solid #8b9dc3"
        }}
      >
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: "blogForm"
})(BlogNew);
