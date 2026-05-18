
function PostCard({ name, content }) {
    return(
        <div className = "post-card">
            <h3>{name}</h3>
            <p>{content}</p>
        </div>
    );
}

export default PostCard;