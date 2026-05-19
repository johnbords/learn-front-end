import React, { use, useState } from 'react';

function LikeButton() {

    // useState() - react hook
    const [likes, setLikes] = useState(0);

    return( 
        // onClick event handler - updates state
        <button onClick={() => setLikes(likes + 1)}>
            {/* Conditional rendering; Ternary operator */}
            Like {likes > 0 ? likes : ""}
        </button>
    );
}

export default LikeButton;