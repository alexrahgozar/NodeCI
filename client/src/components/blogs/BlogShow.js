import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBlog } from "../../actions";

class BlogShow extends Component {
  componentDidMount() {
    this.props.fetchBlog(this.props.match.params._id);
  }

  renderImage() {
    if (this.props.blog.imageUrl) {
      return (
        <img
          src={
            "https://s3-us-west-2.amazonaws.com/alex-blog-bucket-101/" +
            this.props.blog.imageUrl
          }
        />
      );
    }
  }
  render() {
    if (!this.props.blog) {
      return "";
    }

    const { title, content } = this.props.blog;

    return (
      <div>
        <h3
          style={{
            fontFamily: "Times New Roman",
            fontSize: "30px",
            color: "#FF6633"
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "Arial",
            fontSize: "20px",
            color: "#FF6633"
          }}
        >
          {content}
        </p>
        {this.renderImage()}
      </div>
    );
  }
}

function mapStateToProps({ blogs }, ownProps) {
  return { blog: blogs[ownProps.match.params._id] };
}

export default connect(
  mapStateToProps,
  { fetchBlog }
)(BlogShow);
