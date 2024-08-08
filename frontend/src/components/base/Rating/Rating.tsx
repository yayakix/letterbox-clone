import { useState } from "react";
import "./rating.scss";


export interface RatingProps {
    totalStars: number;
    shape?: string;
    disabled?: boolean
    readOnly?: boolean;
    readOnlyValue?: number
}

const Rating: React.FC<RatingProps> = ({
    totalStars,
    shape = '\u2605',
    disabled = false,
    readOnly = false,
    readOnlyValue = 5,
    ...props
}) => {
    const defaultRating = readOnly ? readOnlyValue : 0;

    const numberOfStars = totalStars
    const [rating, setRating] = useState(defaultRating);
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleStarClick = () => {
        if (!disabled && !readOnly) {
            if (hoveredRating > 0)
                setRating(hoveredRating);
        }
    };
    const handleStarHover = (e: React.MouseEvent<HTMLSpanElement>, index: number) => {
        if (!disabled && !readOnly) {
            const starWidth = (e.currentTarget as HTMLSpanElement).offsetWidth;
            const mouseX = e.pageX - (e.currentTarget as HTMLSpanElement).getBoundingClientRect().left;
            const hoverWidth = (mouseX / starWidth) * 100;

            // Round hoverWidth to nearest 10 for more predictable behavior
            const roundedHoverWidth = Math.round(hoverWidth / 10) * 10;

            // Determine hoveredRating based on hoverWidth
            if (roundedHoverWidth > 0 && roundedHoverWidth < 50) {
                setHoveredRating(index + 0.5);
            } else if (roundedHoverWidth >= 50 && roundedHoverWidth <= 100) {
                setHoveredRating(index + 1);
            }
        }
    };

    const handleStarLeave = () => {
        if (!disabled) {
            setHoveredRating(0);
        }
    };

    return (
        <>
            <div className="container" {...props}>
                {/* Actual rating stars */}
                <div className="realstarsdiv">
                    {Array.from({ length: numberOfStars }, (_, index) => (
                        <label key={index} >
                            <input
                                type="radio"
                                name="rating"
                                onClick={() => handleStarClick()}
                            />
                            <span
                                className={`${rating + .5 == (index + 1) ? 'halfstar' : 'star'}`}
                                style={{
                                    color: index < rating ? "yellow" : "transparent"
                                }}
                            >
                                {shape}
                            </span>
                        </label>
                    ))}
                </div>
                {/* Fake stars (hovered stars) */}
                <div className="hoveredStars">
                    {Array.from({ length: numberOfStars }, (_, index) => (
                        <label key={index} >
                            <input
                                type="radio"
                                name="rating"
                                onClick={() => handleStarClick()}
                            />
                            <span
                                onMouseMove={(e) => handleStarHover(e, index)}
                                onMouseLeave={handleStarLeave}
                                className={`${hoveredRating + .5 == (index + 1) ? 'halfstar' : 'star'}`}
                                style={{
                                    color: index < hoveredRating ? "yellow" : "transparent"
                                }}
                            >
                                {shape}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Rating;
