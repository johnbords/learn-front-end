import LikeButton from './LikeButton.jsx';

function PostCard({ name, content }) {
    return(
        <div className = "post-card">
            <h3>{name}</h3>
            <p>{content}</p>

            <LikeButton />
        </div>
    );
}

export default PostCard;