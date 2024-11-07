import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import UserService from "../../../../services/UserService";

interface PostCommentProps {
    filmId: string;
    onCommentPosted: () => void;
}

export interface CommentContent {
    content: string;
}

const PostComment: React.FC<PostCommentProps> = ({ filmId, onCommentPosted }) => {
    const [comment, setComment] = useState<string>('');
    const { getToken } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        try {
            const token = await getToken();
            if (!token) return;
            const userService = UserService();
            const commentData: CommentContent = { content: comment };
            await userService.postMovieComment(token, filmId, commentData);
            setComment('');
            onCommentPosted();
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Yap Away!"
                className="w-full p-2 text-gray-700 border rounded-lg focus:outline-none focus:border-gray-500"
                rows={3}
            />
            <button
                type="submit"
                className="mt-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
                Post Yap
            </button>

        </form>
    );
};


export default PostComment
