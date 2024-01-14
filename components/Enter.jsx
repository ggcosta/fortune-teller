import { useEffect } from 'react';
import Video from './Video';

const Enter = ({handleEnter}) => {
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                console.log('Enter key pressed');
                handleEnter()
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div>
            <Video 
                path={'/videos/enter.mp4'}
                loop={true}
            />
        </div>
    );
};

export default Enter;
